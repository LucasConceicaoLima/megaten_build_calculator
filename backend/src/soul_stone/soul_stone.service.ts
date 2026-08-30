import { Injectable } from '@nestjs/common';
import { firestore } from '../firebase/firebase-admin';

@Injectable()
export class SoulStoneService {
  private collection = firestore.collection('soul_stone');

  async getAllSoulStones() {
    const snapshot = await this.collection.get();

    const soulStones = await Promise.all(
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

    return soulStones;
  }
}
