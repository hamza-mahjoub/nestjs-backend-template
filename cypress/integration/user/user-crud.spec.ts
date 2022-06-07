describe('User CRUD', () => {
  before(() => {
    cy.request('/').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  let users = [];
  let length = 0;
  it('Getting all users', () => {
    cy.request('user').then((response) => {
      expect(response.status).to.eq(200);
      users = response.body;
      length = response.body.length;
    });
  });

  it('getUser by id', () => {
    cy.request(`user/${users[length - 1]._id}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('_id', users[length - 1]._id);
      expect(response.body).to.have.property('email', users[length - 1].email);
    });
  });

  it('getUser by non existing id', () => {
    cy.request(`user/626c07c021c78dd30f4def87`).then((response) => {
      expect(response.status).to.eq(200);
      cy.log(response.body);
      expect(response.body).to.eq('');
    });
  });

  it('getUser by non valid id', () => {
    cy.request({ url: `user/azers`, failOnStatusCode: false }).then(
      (response) => {
        expect(response.status).to.eq(412);
        expect(response.body.message).to.eq('Not a valid mongoDb id!');
      },
    );
  });

  const userCreateDto = {
    firstName: 'Hamza',
    name: 'Mahjoub',
    email: 'testhamza@gmail.com',
    fullAddress: {
      address: 'Tunis',
      city: 'Tunis',
      country: 'Tunis',
      postalCode: '1234',
    },
    password: 'testtest',
    phoneNumber: '12345678',
    username: 'Hamza-Mahjoub',
  };
  let createdUserId;
  it('create a user', () => {
    cy.request('POST', 'user', userCreateDto).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('email', userCreateDto.email);
      cy.request('user').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.eq(length + 1);
      });
      createdUserId = response.body._id;
    });
  });

  it('updateUserById', () => {
    cy.request('POST', `/user/${createdUserId}`, {
      fullAddress: {
        address: 'Sousse',
        city: 'Sousse',
        country: 'Tunis',
        postalCode: '8957',
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.fullAddress).to.deep.eq({
        address: 'Sousse',
        city: 'Sousse',
        country: 'Tunis',
        postalCode: '8957',
      });
      expect(response.body._id).to.eq(createdUserId);
      expect(response.body.email).to.eq(userCreateDto.email);
    });
  });

  it('deleteUserById', () => {
    cy.request('DELETE', `user/${createdUserId}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('deletedCount').to.eq(1);
      cy.request('user').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.length).to.eq(length);
      });
    });
  });
});
