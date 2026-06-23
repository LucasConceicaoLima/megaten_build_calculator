import { Injectable } from '@nestjs/common';
import { firestore } from '../firebase/firebase-admin';

@Injectable()
export class TarotService {
  private collection = firestore.collection('tarot');

  async getAllTarots() {
    const snapshot = await this.collection.get();

    const tarots = await Promise.all(
      snapshot.docs.map(async (doc) => {
        const data = { id: doc.id, ...doc.data() };

        const subcollectionsSnapshot = await doc.ref.listCollections();
        for (const subcollectionRef of subcollectionsSnapshot) {
          const subcollectionSnapshot = await subcollectionRef.get();
          data[subcollectionRef.id] = subcollectionSnapshot.docs.map((subDoc) => ({
            id: subDoc.id,
            ...subDoc.data(),
          }));
        }

        return data;
      }),
    );

    return tarots;
  }
}
