
import { v4 as uuidv4 } from 'uuid';
import * as firebase from 'firebase';


var firebaseConfig = {
  apiKey: "AIzaSyBv4r5L3N60pzWaC9GqFcIVPduimqKdzjY",
  authDomain: "nea-app-b1e8f.firebaseapp.com",
  databaseURL: "https://nea-app-b1e8f-default-rtdb.firebaseio.com",
  projectId: "nea-app-b1e8f",
  storageBucket: "nea-app-b1e8f.appspot.com",
  messagingSenderId: "1087619936146",
  appId: "1:1087619936146:web:e87d064470d387dc899b4b",
  measurementId: "G-MN6HSJW7PJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const database = firebase.database();
export const storage = firebase.storage;

//************************ */
// Register User
//************************ */
export  const createUserWithEmailAndPasswordHandler = async ( names, lastNames, email, password, phone) => {
    try{
        console.log(phone)
        const {user} = await auth.createUserWithEmailAndPassword(email, password)

        await generateUserDocument(user, {
          uid: user.uid,
          email: email,
          names: names,
          lastNames: lastNames,
          phone: phone,
          cars: [],
          carwashIds: [],
          profileUrl: "",
          agreement: "",
          status:"",
          profile: {},
          profileUrl: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fno-profile.png?alt=media&token=80097535-6a6b-4283-aa17-7927338d2d1f',
          chatIds: [],
          customer: {},
          notifications: [
            {
              type: 'message',
              header: 'Bienvenido!',
              subject: 'Esperamos que disfrutas NEA Car Care',
              message: 'Bienvenidos a NEA Car Care! Tal vez tienes preguntas, estamos listos a contestar qualquier pregunta que tienes. Solo marcanos a 333 333 3333!'
            }
          ],
          address: "",
          latlang: {},
          paymentMethod: null
        });
        const userInfo = await getUserDocument(user.uid);
        return {user: userInfo, errorMessage: null};
      }
    catch(error){
      return {user: 'user', errorMessage: error.message};
    }
  };

//************************ */
// Create User
//************************ */
export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { uid, email, names,customer, lastNames, cars, profileUrl, notifications, paymentMethod,  latlang,  carwashIds, agreement, status, profile, chatIds, address, phone } = additionalData;
    try {
      await userRef.set({
          uid,
          email,
          names,
          lastNames,
          phone,
          cars,
          carwashIds,
          paymentMethod,
          agreement,
          profileUrl,
          status,
          notifications,
          profile,
          chatIds,
          address,
          latlang,
          customer
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
};

//************************ */
// Load User
//************************ */
export const getUserDocument = async (uid) => {
  console.log('iiii: '. uid)

  if (!uid) return null;

  try {
    console.log('iiii: '. uid)
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getAllWashers = async () => {
  const washerRef = firestore.collection('washers');
  const queryRef = washerRef.where('status', '==', 'trained');
  const washers = []
  const querySnapshot = await queryRef.get();
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const allowed = ['uid', 'names', 'lastNames', 'address', 'latlang', 'profileUrl', 'rating', 'reviews', 'washes'];
    const filtered = Object.keys(data)
    .filter(data => allowed.includes(data))
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
    washers.push(filtered)
  })
  return washers;
}



//************************ */
// Update Carwash Ids on User
//************************ */

export const updateUser = async (user, updateType) => {
  console.log('usr: ', user, user.carwashIds);
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);

  try {
    if(updateType == 'carwashIds'){
      await userRef.update({
        carwashIds: user.carwashIds,
      });
    }
    else if(updateType== 'carwashIds-chat'){
      await userRef.update({
        carwashIds: user.carwashIds,
        chatIds: user.chatIds,
        cars: user.cars
      });
    }
    else if(updateType == 'chatIds'){
      await userRef.update({
        chatIds: user.chatIds,
      });
    }
    else if(updateType == 'cars'){
      await userRef.update({
        cars: user.cars,
      });
    }
    else if(updateType == 'profile'){
      await userRef.update({
        profile: user.profile,
      });
    }
    else if(updateType == 'paymentMethod'){
      await userRef.update({
        paymentMethod: user.paymentMethod,
        customer: user.customer
      });
    }
  } catch (error) {
    console.error("Error updating user document", error);
  }
  
};






//************************ */
//
//
//
//
//
//
//
// Washers Database 
//
//
//
//
//
//
//
//
// 
//************************ */






//************************ */
// Register Washer
//************************ */
export  const createWasherWithEmailAndPasswordHandler = async ( names, lastNames, email, phone, password ) => {
  try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password)
      await generateWasherDocument(user, {
        uid: user.uid,
        email: email,
        names: names,
        lastNames: lastNames,
        phone: phone,
        agreement:"",
        address: "",
        status:"registered",
        documents: {
          antecedentesNoPenales:'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224',
          antidoping:'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224',
          coprobanteDeDomicilio: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224',
          identificacionOficial: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224',
          registroDatosFiscales: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fnotadocument.png?alt=media&token=bdd34b21-2343-4bbd-aa0e-d916c103f224'
        },
        profile: {},
        profileUrl: 'https://firebasestorage.googleapis.com/v0/b/nea-app-b1e8f.appspot.com/o/app-assets%2Fno-profile.png?alt=media&token=80097535-6a6b-4283-aa17-7927338d2d1f',
        notifications: [],
        availability: {},
        chatIds: [],
        carwashIds: [],
        latlang: {},
        rating: 2.5,
        reviews: [],
        washes: 0,
        stripeAccount: '',
      });
      const washerInfo = await getWasherDocument(user.uid);
      return {washer: washerInfo, errorMessage: null};;
  }
  catch(error){
    return {washer: 'washer', errorMessage: error.message};
  }
};


  //************************ */
// Create Washer
//************************ */
export const generateWasherDocument = async (washer, additionalData) => {
  if (!washer) return;
  const washerRef = firestore.doc(`washers/${washer.uid}`);
  const snapshot = await washerRef.get();

  if (!snapshot.exists) {
    const { uid, email, names, lastNames, phone, profileUrl, rating, stripeAccount, reviews, washes, status, documents, agreement, address, profile, notifications, availability, chatIds, carwashIds, latlang } = additionalData;
    try {
      await washerRef.set({
        uid,
        email,
        names,
        lastNames,
        phone,
        agreement,
        address,
        status,
        documents,
        profile,
        profileUrl,
        notifications,
        chatIds,
        carwashIds,
        availability,
        latlang,
        rating,
        reviews,
        washes,
        stripeAccount,
      });
    } catch (error) {
      console.error("Error creating washer document", error);
    }
  }
};

//************************ */
// Load Washer
//************************ */
export const getWasherDocument = async (uid) => {
  if (!uid) return null;
  try {
    const washerDocument = await firestore.doc(`washers/${uid}`).get();
    return {
      uid,
      ...washerDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};

export const getCarwashesForWasher = async (carwashIds) => {
  console.log('******************', carwashIds)
  let carwashes = []
  carwashIds.forEach(async (id) => {
    const carwashRef = await firestore.doc(`carwash/${id}`).get();
    const data = carwashRef.data();
    carwashes.push(data)
    console.log('i', data)
  })
  console.log('@@@@@@@@@@@', carwashes)
  return carwashes;
}

//************************ */
// Update Washer
//************************ */

export const updateWasher = async (washer, updateType) => {
  if (!washer) return;
  const washerRef = firestore.doc(`washers/${washer.uid}`);
  let snapshot;
  try{
    snapshot = await washerRef.get();
  } catch (error) {
    console.error('er', error)
  }

  try {
    if(updateType== 'carwashIds'){
      await washerRef.update({
        carwashIds: washer.carwashIds,
      });
    }
    else if(updateType== 'carwashIds-chat'){
      await washerRef.update({
        carwashIds: washer.carwashIds,
        chatIds: washer.chatIds
      });
    }
    else if(updateType== 'chatIds'){
      await washerRef.update({
        chatIds: washer.chatIds,
      });
    }
    else if(updateType== 'cars'){
      await washerRef.update({
        cars: washer.cars,
      });
    }
    else if(updateType== 'profile'){
      await washerRef.update({
        profile: washer.profile,
      });
    }
    else if(updateType== 'trained'){
      await washerRef.update({
        status: washer.status,
      });
    }
    else if(updateType== 'availability'){
      await washerRef.update({
        availability: washer.availability,
        status: washer.status,
      });
    }
    else if(updateType== 'address'){
      await washerRef.update({
        address: washer.address,
      });
    }
    else if(updateType== 'stripeAccount'){
      console.log('made it here: ****: ', washer.stripeAccount);
      await washerRef.update({
        stripeAccount: washer.stripeAccount,
      });
    }
    else if(updateType== 'uploadDocuments'){
      console.log('ddd: ', washer.status)
      await washerRef.update({
        address: washer.address,
        status: washer.status,
        documents: washer.documents,
        profileUrl: washer.profileUrl,
        latlang: washer.latlang
      });
    }
  } catch (error) {
    console.error("Error updating washer document", error);
  }
  
};




//************************ */
//
//
//
//
//
//
//
// Carwash Database 
//
//
//
//
//
//
//
//
// 
//************************ */






//************************ */
// Create carwash
//************************ */
export const createCarwash = async (data) => {
    const uuidCarwash = uuidv4();
    console.log('uuid of carwash: ', uuidCarwash)
    const carwashRef = firestore.doc(`carwash/${uuidCarwash}`);
    const snapshot = await carwashRef.get();

    if (!snapshot.exists) {
      try {
        await carwashRef.set({
            id: uuidCarwash,
            car: data.car,
            washType: data.washType,
            userId: data.userId,
            washer: data.washer,
            paymentStatus: data.paymentStatus,
            recurring: data.recurring,
            subscription: data.subscription,
            date: data.date,
            dateString: data.dateString,
            time: data.time,
            chatId: data.chatId,
            stripeToken: data.stripeToken,
            status: data.status,
            closestWashers: data.closestWashers,
            price: data.price
        });
      } catch (error) {
        console.error("Error creating carwash document", error);
      }
      const carwashId = await getCarwashDocument(uuidCarwash);
      return carwashId;
    }
  };

//************************ */
// Load carwash
//************************ */
export const getCarwashDocument = async (carwashId) => {
    if (!carwashId) return null;
    try {
      const carwashDocument = await firestore.doc(`carwash/${carwashId}`).get();
      return {
        carwashId,
        ...carwashDocument.data()
      };
    } catch (error) {
      console.error("Error fetching user", error);
    }
  };

  //************************ */
// Update Carwash 
//************************ */

export const updateCarwash = async (carwash, updateType) => {
  console.log('c', carwash);
  if (!carwash) return;
  const carwashRef = firestore.doc(`carwash/${carwash.id}`);
  let snapshot;
  try{
    snapshot = await carwashRef.get();
  } catch (error) {
    console.error('er', error)
  }
  try {
    if(updateType== 'washType'){
      await carwashRef.update({
        washType: carwash.washType,
      });
    }
    else if(updateType == 'status'){
      await carwashRef.update({
        status: carwash.status,
      });
    }
    else if(updateType== 'washerId'){
      await carwashRef.update({
        washer: carwash.washer,
      });
    }
    else if(updateType== 'washerId-closest'){
      await carwashRef.update({
        washer: carwash.washer,
        closestWashers: carwash.closestWashers
      });
    }
  } catch (error) {
    console.error("Error updating carwash document", error);
  }
  
};



//************************ */
//
//
//
//
//
//
//
// Chat Database 
//
//
//
//
//
//
//
//
// 
//************************ */

//************************ */
// Create Chat
//************************ */
export const createChat = async (data) => {
  const chatId = uuidv4();

  const chatRef = firestore.doc(`chats/${chatId}`);
  const snapshot = await chatRef.get();

  if (!snapshot.exists) {
    try {
      await chatRef.set({
        id: chatId,
        messages: data.messages,
        userId: data.userId,
        washerId: data.washerId,
        washerUrl: data.washerUrl,
        userUrl: data.userUrl,
        userName: data.userName,
        washerName: data.washerName,
      });
    } catch (error) {
      console.error("Error creating chat document", error);
    }
    const id = await getChatDocument(chatId);
    return id;
  }
};

//************************ */
// Load chat
//************************ */
export const getChatDocument = async (chatId) => {
  if (!chatId) return null;
  try {
    const chatDocument = await firestore.doc(`chats/${chatId}`).get();
    return {
      chatId,
      ...chatDocument.data()
    };
  } catch (error) {
    console.error("Error fetching chat", error);
  }
};

  //************************ */
// Update chat 
//************************ */

export const updateChat = async (chat, updateType) => {
  if (!chat) return;
  const chatRef = firestore.doc(`chats/${chat.currentChat.chatId.chatId}`);
  let snapshot;
  try{
    snapshot = await chatRef.get();
  } catch (error) {
    console.error('er', error)
  }
  try {
    if(updateType== 'messages'){
      await chatRef.update({
        messages: chat.currentChat.chatId.messages,
      });
    }
  } catch (error) {
    console.error("Error updating chat document", error);
  }
  
};




