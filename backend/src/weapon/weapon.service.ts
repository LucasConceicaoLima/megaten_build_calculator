import { Injectable } from '@nestjs/common';
import { firestore } from '../firebase/firebase-admin';

@Injectable()
export class WeaponService {
  private collection = firestore.collection('weapon');

  async getAllWeapons() {
    const snapshot = await this.collection.get();

    const weapons = await Promise.all(
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

    return weapons;
  }
}
