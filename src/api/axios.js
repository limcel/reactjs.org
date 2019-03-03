import Axios from 'axios';
import OAuth from 'client-oauth2';

const appID = 'hacktech-hacktech-PRD-f16de56b6-85aa39cf';
const authToken =
  'v^1.1#i^1#r^0#p^1#I^3#f^0#t^H4sIAAAAAAAAAOVXe2wURRjv9aUNIpIoGMR4LE9Lbm/37vbudksv2dICBy09uJZAAWF2d7Zduy925tqeQW2ayksTjBgiRIRgMMHEF4loQnxgFDX6BxE1MRgTFRRBEomJNAbF2b2jXCsBCoeQeL3kut98883v9/u+b2aH6a2sql43b93Z0b7bSnf1Mr2lPh87iqmqrJh5Z1nphIoSpsDBt6t3Sm95X9mJWQgYui0shsi2TAT9PYZuIsEz1lIZxxQsgDQkmMCASMCykBabGoUQzQi2Y2FLtnTKn6yvpfgIlCKhaAiE5LDCA55YzQsxWywyrspxFoB4VFKYWFwOk3GEMjBpIgxMXEuFGJYPMGHybWFiAhcRIhwd5rg2yr8EOkizTOJCM1TCgyt4c50CrJeHChCCDiZBqERSnJNuFpP1DQtbZgULYiXyOqQxwBk09Gm2pUD/EqBn4OWXQZ63kM7IMkSICiZyKwwNKogXwFwDfE/qOKvGgRqJKjDOsZwqFUXKOZZjAHx5HK5FUwKq5ypAE2s4eyVFiRrSw1DG+aeFJESy3u/+LMoAXVM16NRSDXXiMjGVohIdQO7EUO4IDP6TWlwfUFnClYtK0UCcAyDMy2p+oVy0vMzDVpptmYrmiob8Cy1cBwlqOFybSIE2xKnZbHZEFbuICv34QQ1DbW5Sc1nM4A7TzSs0iBB+7/HKGRicjbGjSRkMByMMH/AkqqWAbWsKNXzQq8V8+fSgWqoDY1sIBru7u+nuMG057cEQw7DBpU2NabkDGoAivm6v5/y1K08IaB4VGZKZSBNw1iZYekitEgBmO5UIk8rjQ3ndh8JKDLf+y1DAOTi0I4rVITJQo7ISi8OoGpKioVgxOiSRL9KgiwNKIBswgNMJsa0DGQZkUmcZAzqaIoQ5NRSOqzCgRHk1EOFVNSBxSjTAqhAyEEqSzMf/T41ytaWeli0bpixdk7NFKfjiFbujpICDs2mo68RwtVV/SZLIJXnD6bm9PiKKbgxEggBbo93apmXLCFqAbGquaZWH+rp4i7adNIwMBpIOk8XZ0G7SZnZJeho57m8pTiR/uURqSu6cpr1s0qhLph2IrIxDXlHoZvfYarE6oUk2AexYug6dJex1J/oWy+8I98pr4128g3qEvEmvh25obcu6Rkpo1c1hd5OzqgF8a7FmOfLKz/PROHddvGZ7OW3J/gdn0YjozbMQhsoNeK8MDr3lJkq8D9vne5Pp871BLspMkJnKTmYmVZa1lpfdMQFpGNIaUGmktZvk8uZAuhNmbaA5pZW+5RNf37uq4F69ayVz7+DNuqqMHVVwzWYmXhypYMeMH83yTJj8xbhIhGtjJl8cLWfHld89dVlNKH3y/AL+1XOn9vdNW9Sf+aaRGT3o5PNVlJT3+Uq2VDdN/aL/pekrFlRvlMZv+rnz6a8//nLD2/sTHS+u2L5Gee/91qaWgwP+kj2b75pxdu2jO//8pPqA+NY93PKDk9veXft8autPC8b+tp3esf5U5y/vnNmqNW5ozGzemJr07GviRw/g716eMv3M4f4Nvd0sNSFxsrVmW3BgzdhX5qz8fGJ1jXPy/uPHtiT3H/t9XEPbM3uz4ysfqRvb/9mMv1bfLv4xT+ppsl/wL5v/1JHVmxLy/Iq5xs5Dp8Wje45MOtRzfu7ugelP7Os6vlFfNy27/u8P27OHfzW+an0svvvA7hOx088dHaj5NNbw+JiHvv9R3PHtOV+i6tjMA0/+sFTv+mBt1/F99+2N1+1ZI4/ZdurBXPr+AfMwpwXxEAAA';
const clientSecret = 'PRD-16de56b6667d-60e1-4830-a274-ff9f';

const ebayAuth = new OAuth({
  clientId: appID,
  clientSecret,
  scopes: ['notifications', 'gist'],
});

// This obtains the user consent

export const axiosConfig = () => {
  return Axios.create({
    baseURL: 'https://api.ebay.com/',
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const searchForItems = async string => {
  const api = await axiosConfig();
  return api
    .get('buy/browse/v1/item_summary/search', {
      params: {
        q: string,
      },
    })
    .then(r => r.data);
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
