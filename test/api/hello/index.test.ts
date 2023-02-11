import { createMocks } from 'node-mocks-http';

import handlerHello from 'src/pages/api/hello';

describe('Hello Route', () => {
  it('should return something', () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: {
        name: 'John Doe'
      }
    });

    handlerHello(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getJSONData()).toEqual({ name: 'John Doe' });
  });
});

export {};
