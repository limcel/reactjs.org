import Axios from 'axios';
import OAuth from 'client-oauth2';

const appID = 'hacktech-hacktech-PRD-f16de56b6-85aa39cf';
const authToken =
  'v^1.1#i^1#f^0#r^0#p^1#I^3#t^H4sIAAAAAAAAAOVYfWwURRTv9ctAKSRCKx+mORbQILm92d3e14Y7uLZUDktbuFIQMDi3O9fb9m732Jm1PYxYmvARJCYmGiPR2BATDCGBiCR+BP8iJghJURBJEWNiEFQwQIytCsbZvaNcKylHObCJ95G9nXnvzXu/93s77wZ0l054atvSbQPltkcKe7tBd6HNxpWBCaUlCyYXFc4sKQBZArbe7rndxT1FlxZimIgnxZUIJzUVI3tXIq5i0Rr0M4auihrEChZVmEBYJJIYDi5vEHkWiEldI5qkxRl7qM7PyJIrEnG5gVAtu3y85Kaj6i2bLZqfkQSe98q85PN5XUBySXQeYwOFVEygSvwMDzifAwj00wK8ogBE4GWrXdxaxt6KdKxoKhVhAROw3BUtXT3L19FdhRgjnVAjTCAUrA83BUN1SxpbFjqzbAUyOIQJJAYeflerycjeCuMGGn0ZbEmLYUOSEMaMM5BeYbhRMXjLmTG4b0Fd7RGgS/BxUYGjXxTNC5T1mp6AZHQ/zBFFdkQtURGpRCGpuyFK0Yi0I4lk7hqpiVCd3bysMGBciSpI9zNLaoLPBpubmUAMSh0ESTHH0I9wzRoH5NyIj7qkqEPweDyRCHBnFkpby8A8YqVaTZUVEzRsb9RIDaJeo5HY8FnYUKEmtUkPRonpUZYcB25hyHvWmklNZ9EgMdXMK0pQIOzW7d0zMKRNiK5EDIKGLIycsCDyMzCZVGRm5KTFxQx9urCfiRGSFJ3Ozs5OtlNgNb3NyQPAOdcsbwhLMZSADJU1az0tr9xdwaFYoUiIamJFJKkk9aWLcpU6oLYxAYEXuGoug/twtwIjR/81kBWzc3hF5KtC3MgFOR5Ibp8HuCXozkeFBDIkdZp+oAhMORJQ70AkGYcSckiUZ0YC6YosCq4oL3ijyCG7fVFHtS8adURcstvBRRECCEUiks/7fyqUXKkelrQkatbiipTKC+HzR3ZdboY6SdUYKXofRvE4veTK/TuGis1QH2CQZq2PIVDTBqZGYFJhTYazkpZwapA+2syhDZbX9lyEnBEjxbYZCBPqhUx3l5yVFEoRlhaKnLtKugxpALmr0NZFNiQypoWsemcpkkpbjOB7WrNrDKBgSjc2rrUpmCgSZpOGrN0X9YLJZCiRMAiMxFEoPzvLf7Sr3DE8hfZd4yommtN0chU53TCxVoZZ/ILE6ghrhk57RbbJ7B9atA6k0qcx0bV4HOmtuSFh1vpoyR5nOb7HjWtsLMhf1zSeuC3FFUqhDeMtsoeSUQWS8RU153JxbsB5gfe+4qq1ctqSyq0dKN5y6uFFuFTDBMkPoMd3Dj9xCBRYL67HdgT02D4utNmABzi4BWB+adGq4qJJDKZNAYuhKke0LlaBUZZuvSr9Q60jtgOlklDRC0tt62b9vOhG1llH73Ng+tBpx4Qirizr6AM8fnumhJvyWDnnAwJ9ewUAvGvBnNuzxVxl8bRjG7tmnt/Mn/7g2G+d7VPw4bLaHcdA+ZCQzVZSUNxjK1h1s/X15vN7rr+84/v9r8Um1wuLF9UK7QPXqo6++cOm61unzGbCDQfmHllzZcGJX9b/+vfkiomNq2vAurOHmt7uP1jYXajumzRjd8O3/XBS6eCL5VfX/37zj1N1W8TYqzuOvvGlsuzpk1/M3fJkZY/v0Ynvti/76czewSd8s9+HLyVWn60yph/YWL93z7QLc16pOnipZ+O8infg8V3by9s21zyz+wb67uSmwxdtSwbnX963/evj/X3okxNls2fc3Hnh3Kez9ix2Ln3+m88dFwcqvtpf/ZnAX33vw5Xtp3s9UxNTz/X1VWz/88drqw5VvNV/pbLy8l+DJ8BZvCiyte/QzsDApjPzVlysbe2ou1T10XznqXQa/wEohQWzhRIAAA==';
const clientSecret = 'PRD-16de56b6667d-60e1-4830-a274-ff9f';
const fakeItemId = 'v1|110392198678|0';
const fakeMastercard = 5395311725039872;

const ebayAuth = new OAuth({
  clientId: appID,
  clientSecret,
  scopes: ['notifications', 'gist'],
});

// This obtains the user consent

export const axiosConfig = () => {
  return Axios.create({
    baseURL: 'https://apix.sandbox.ebay.com/',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const initiateCheckoutSession = async () => {
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
        lineItemInputs: [
          {
            /* LineItemInput */
            itemId: fakeItemId,
            quantity: '1',
          },
        ],
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
    return response.data;
  } catch (e) {
    console.log(e.response.data);
  }
};

// export const retrieveAndStoreBuyerOAuth = async () => {
//   export const api = await axiosConfig();
//   return api.post('/identity/v1/oauth2/token', {
//     grant_type: 'authorization_code',
//   });
// };

// Category ids found here https://www.isoldwhat.com/getcats/index.php?RootID=293#293
// export const searchItems = async string => {
//   return await Axios.get(
//     'http://svcs.ebay.com/services/search/FindingService/v1',
//     {
//       params: {
//         'OPERATION-NAME': 'findItemsAdvanced',
//         'SERVICE-VERSION': '1.0.0',
//         'SECURITY-APPNAME': appID,
//         'RESPONSE-DATA-FORMAT': 'JSON',
//         'REST-PAYLOAD': true,
//         'paginationInput.entriesPerPage': 99999,
//         keywords: string,
//       },
//       headers: {'Access-Control-Allow-Origin': '*'},
//     },
//   ).then(r => r.data);
// };
