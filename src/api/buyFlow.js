import {initiateCheckoutSession, initiatePayment} from 'api/axios';

export const buyFlow = async itemIds => {
  const checkoutSessionId = await initiateCheckoutSession(itemIds);
  console.log(checkoutSessionId);
  const purchase = await initiatePayment(checkoutSessionId);
  console.log(purchase);
};
