jest.mock('../server');
const get_tracking_number_by_order_id  = require('../server');

it("test_tracking_number_found", async () => {
    const mockRequest = jest.fn().mockResolvedValue([{tracking_number: "123456789"}]);
    const result = await get_tracking_number_by_order_id(123);
    expect(result).toBe("http://wwwapps.ups.com/WebTracking/processRequest?&tracknum=123456789");
});

it("test_no_tracking_number_found", async () => {
    const mockRequest = jest.fn().mockResolvedValue([{not_tracking_number: "123456789"}]);
    const result = await get_tracking_number_by_order_id(123);
    expect(result).toBeNull();
});