import liff from '@line/liff';

export const liffApp = () => {
  if (typeof window !== 'undefined') {
    const accestoken = liff.getAccessToken();
    alert(accestoken);
    console.log(accestoken);
    return accestoken;
  }
};
