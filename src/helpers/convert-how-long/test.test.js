import {convertHowLong} from './index'
describe("function convertHowLong", () => {
  const now = Math.ceil(new Date().getTime() / 1000);
  beforeEach(() => {});
  it("should return 1 วันที่แล้ว when news createdAt yesterday", () => {
    const createdAtYesterday = now - 24 * 60 * 60;
    
    expect(convertHowLong(createdAtYesterday)).toEqual("1 วันที่แล้ว")
  });
});
