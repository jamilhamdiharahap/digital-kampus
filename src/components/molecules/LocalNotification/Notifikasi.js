import PushNotification from 'react-native-push-notification';

class Notifikasi {
  configure = () => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *
       */
      requestPermissions: true,
      requestPermissions: Platform.OS === 'ios',
    });
  };
  buatChannel = channel => {
    PushNotification.createChannel(
      {
        channelId: channel, // (required)
        channelName: 'My channel', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        soundName: 'my_sound', // (optional) See `soundName` parameter of `localNotification` function
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
  };

  kirimNotifikasi = (channel, judul, pesan) => {
    PushNotification.localNotification({
      channelId: channel,
      title: judul,
      message: pesan,
      subText: 'Pemimjaman Buku',
      soundName: 'my_sound',
      actions: ['Baik'],
    });
  };

  kirimNotifikasiJadwal = (channel, judul, pesan, lamanya) => {
    PushNotification.localNotificationSchedule({
      //... You can use all the options from localNotifications
      id: channel,
      channelId: channel,
      title: judul,
      message: pesan, // (required)
      date: new Date(Date.now() + lamanya), // in 60 secs
      subText: 'Pemimjaman Buku',
      soundName: 'my_sound',
      actions: ['Baik'],
      /* Android Only Properties */
      repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
    });
  };

  cancelNotifikasi = idCancel => {
    console.log(idCancel);
    PushNotification.cancelLocalNotification({idCancel});
  };
}

export const notifikasi = new Notifikasi();
