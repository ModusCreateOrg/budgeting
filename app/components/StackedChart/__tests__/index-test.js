const mockedLoadable = jest.fn();
jest.mock('utils/loadable', () => mockedLoadable);

it('uses loadable', done => {
  import('../index').then(() => {
    expect(mockedLoadable).toBeCalled();
    done();
  });
});
