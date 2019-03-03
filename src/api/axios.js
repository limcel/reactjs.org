import Axios from 'axios';

const appID = 'hacktech-hacktech-PRD-f16de56b6-85aa39cf';
const authToken =
  'v^1.1#i^1#f^0#r^0#p^1#I^3#t^H4sIAAAAAAAAAOVYfWwURRTv9ctAKSRCKx+mORbQILm92d3e14Y7uLZUDktbuFIQMDi3O9fb9m732Jm1PYxYmvARJCYmGiPR2BATDCGBiCR+BP8iJghJURBJEWNiEFQwQIytCsbZvaNcKylHObCJ95G9nXnvzXu/93s77wZ0l054atvSbQPltkcKe7tBd6HNxpWBCaUlCyYXFc4sKQBZArbe7rndxT1FlxZimIgnxZUIJzUVI3tXIq5i0Rr0M4auihrEChZVmEBYJJIYDi5vEHkWiEldI5qkxRl7qM7PyJIrEnG5gVAtu3y85Kaj6i2bLZqfkQSe98q85PN5XUBySXQeYwOFVEygSvwMDzifAwj00wK8ogBE4GWrXdxaxt6KdKxoKhVhAROw3BUtXT3L19FdhRgjnVAjTCAUrA83BUN1SxpbFjqzbAUyOIQJJAYeflerycjeCuMGGn0ZbEmLYUOSEMaMM5BeYbhRMXjLmTG4b0Fd7RGgS/BxUYGjXxTNC5T1mp6AZHQ/zBFFdkQtURGpRCGpuyFK0Yi0I4lk7hqpiVCd3bysMGBciSpI9zNLaoLPBpubmUAMSh0ESTHH0I9wzRoH5NyIj7qkqEPweDyRCHBnFkpby8A8YqVaTZUVEzRsb9RIDaJeo5HY8FnYUKEmtUkPRonpUZYcB25hyHvWmklNZ9EgMdXMK0pQIOzW7d0zMKRNiK5EDIKGLIycsCDyMzCZVGRm5KTFxQx9urCfiRGSFJ3Ozs5OtlNgNb3NyQPAOdcsbwhLMZSADJU1az0tr9xdwaFYoUiIamJFJKkk9aWLcpU6oLYxAYEXuGoug/twtwIjR/81kBWzc3hF5KtC3MgFOR5Ibp8HuCXozkeFBDIkdZp+oAhMORJQ70AkGYcSckiUZ0YC6YosCq4oL3ijyCG7fVFHtS8adURcstvBRRECCEUiks/7fyqUXKkelrQkatbiipTKC+HzR3ZdboY6SdUYKXofRvE4veTK/TuGis1QH2CQZq2PIVDTBqZGYFJhTYazkpZwapA+2syhDZbX9lyEnBEjxbYZCBPqhUx3l5yVFEoRlhaKnLtKugxpALmr0NZFNiQypoWsemcpkkpbjOB7WrNrDKBgSjc2rrUpmCgSZpOGrN0X9YLJZCiRMAiMxFEoPzvLf7Sr3DE8hfZd4yommtN0chU53TCxVoZZ/ILE6ghrhk57RbbJ7B9atA6k0qcx0bV4HOmtuSFh1vpoyR5nOb7HjWtsLMhf1zSeuC3FFUqhDeMtsoeSUQWS8RU153JxbsB5gfe+4qq1ctqSyq0dKN5y6uFFuFTDBMkPoMd3Dj9xCBRYL67HdgT02D4utNmABzi4BWB+adGq4qJJDKZNAYuhKke0LlaBUZZuvSr9Q60jtgOlklDRC0tt62b9vOhG1llH73Ng+tBpx4Qirizr6AM8fnumhJvyWDnnAwJ9ewUAvGvBnNuzxVxl8bRjG7tmnt/Mn/7g2G+d7VPw4bLaHcdA+ZCQzVZSUNxjK1h1s/X15vN7rr+84/v9r8Um1wuLF9UK7QPXqo6++cOm61unzGbCDQfmHllzZcGJX9b/+vfkiomNq2vAurOHmt7uP1jYXajumzRjd8O3/XBS6eCL5VfX/37zj1N1W8TYqzuOvvGlsuzpk1/M3fJkZY/v0Ynvti/76czewSd8s9+HLyVWn60yph/YWL93z7QLc16pOnipZ+O8infg8V3by9s21zyz+wb67uSmwxdtSwbnX963/evj/X3okxNls2fc3Hnh3Kez9ix2Ln3+m88dFwcqvtpf/ZnAX33vw5Xtp3s9UxNTz/X1VWz/88drqw5VvNV/pbLy8l+DJ8BZvCiyte/QzsDApjPzVlysbe2ou1T10XznqXQa/wEohQWzhRIAAA==';
const clientSecret = 'PRD-16de56b6667d-60e1-4830-a274-ff9f';
const fakeItemId = 'v1|110392198678|0';
const fakeMastercard = 5395311725039872;
const userToken =
  'v^1.1#i^1#f^0#p^3#r^0#I^3#t^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';

// This obtains the user consent

export const axiosConfig = () => {
  return Axios.create({
    baseURL: 'https://apix.sandbox.ebay.com/',
    headers: {
      Authorization: `Bearer ${userToken}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const initiateCheckoutSession = async itemIds => {
  const lineItemInputs = itemIds.map(itemId => ({itemId, quantity: 1}));
  const api = await axiosConfig();
  try {
    const response = await api.post(
      '/buy/order/v1/guest_checkout_session/initiate',
      {
        contactEmail: 'test@test.com',
        contactFirstName: 'test',
        contactLastName: 'test',
        /* CreateSignInCheckoutSessionRequest */
        creditCard: {
          /* CreditCard */
          accountHolderName: 'test',
          billingAddress: {
            /* BillingAddress */
            addressLine1: 'string',
            addressLine2: 'string',
            city: 'string',
            country: 'AF',
            county: 'string',
            firstName: 'string',
            lastName: 'string',
            postalCode: 'string',
            stateOrProvince: 'string',
          },
          brand: 'Mastercard',
          cardNumber: `${fakeMastercard}`,
          cvvNumber: '333',
          expireMonth: '11',
          expireYear: '2022',
        },
        lineItemInputs,
        shippingAddress: {
          /* ShippingAddress */
          addressLine1: 'string',
          addressLine2: 'string',
          city: 'string',
          country: 'US',
          county: 'string',
          phoneNumber: '1111111111',
          postalCode: '11111',
          recipient: 'string',
          stateOrProvince: 'CA',
        },
      },
    );
    return response.data.checkoutSessionId;
  } catch (e) {
    console.log(e.response.data);
  }
};

export const initiatePayment = async checkoutSessionId => {
  const api = await axiosConfig();
  try {
    const response = await api.post(
      `buy/order/v1/guest_checkout_session/${checkoutSessionId}/initiate_payment`,
      {
        paymentMethodType: 'WALLET',
        paymentMethodBrandType: 'PAYPAL_CHECKOUT',
      },
    );
    return response.data;
  } catch (e) {
    console.log(e.response.data);
  }
};
