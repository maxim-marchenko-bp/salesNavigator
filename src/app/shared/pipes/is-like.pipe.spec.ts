import { IsLikePipe } from './is-like.pipe';

describe('IsLikePipe', () => {
  it('create an instance', () => {
    const pipe = new IsLikePipe();
    expect(pipe).toBeTruthy();
  });
});
