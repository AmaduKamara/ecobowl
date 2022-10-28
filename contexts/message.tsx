import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export const ShowMessage = (type: NotificationType, title, message: string) => {
  notification[type]({
    message: "Ecobowl",
    description: message
  });
};