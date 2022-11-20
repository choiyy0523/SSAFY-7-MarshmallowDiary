// import React from 'react';
// import {Text, View, Button} from 'react-native';
// import {AndroidColor} from '@notifee/react-native';
// import PushNotification, {Importance} from 'react-native-push-notification';

// function Push() {
//   PushNotification.createChannel(
//     {
//       channelId: 'channel-id', // (required)
//       channelName: 'My channel', // (required)
//       channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
//       importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//       vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//     },
//     created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
//   );

//   PushNotification.localNotificationSchedule({
//     message: '마로가 기다리고 있어요! 일기 쓰러 오세요~', // (required)
//     date: new Date(Date.now() + 60 * 1000), // in 60 secs
//     repeatType: 'day',
//   });

//   return (
//     <View>
//       <Button
//         title="Display Notification"
//         onPress={() => onDisplayNotification()}
//       />
//     </View>
//   );
// }
// export default Push;
