export const USER_STUB_ID = '626c07c021c78dd30f4def89';
export const USER_STUB_EMAIL = 'Flen Ben Foulen';

export const userStub = (id, email) => {
  return {
    _id: id,
    name: 'Ben flen',
    firstName: 'flen',
    username: 'flen-ben-flen',
    email,
    password: '12345678',
    role: 'USER',
    fullAddress: {
      city: 'Tunis',
      country: 'Tunis',
      postalCode: '1234',
      address: 'Hay khadhra',
    },
    phoneNumber: '12345678',
    status: 'DESACTIVATED',
  };
};
