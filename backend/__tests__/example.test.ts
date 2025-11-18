describe('Basic Math Operations', () => {
  test('1 + 1 should equal 2', () => {
    expect(1 + 1).toBe(2);
  });

  test('2 * 3 should equal 6', () => {
    expect(2 * 3).toBe(6);
  });

  test('Arrays should contain specific items', () => {
    const fruits = ['apple', 'banana', 'orange'];
    expect(fruits).toContain('banana');
    expect(fruits).toHaveLength(3);
  });

  test('Objects should have specific properties', () => {
    const user = { name: 'John', age: 30 };
    expect(user).toHaveProperty('name');
    expect(user.age).toBeGreaterThan(18);
  });
});