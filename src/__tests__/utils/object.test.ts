import { includeSamePropertyValue } from '../../utils/object';

test('includeSamePropertyValue should be true', () => {
  const obj1 = {
    a: 'aa',
    b: 'bb',
    c: 'cc',
  };
  const obj2 = {
    b: 'bb',
    c: 'cc',
  };

  expect(includeSamePropertyValue(obj1, obj2)).toBeTruthy();
});

test('includeSamePropertyValue should not be true', () => {
  const obj1 = {
    a: 'aa',
    b: 'bb',
    c: 'cc',
  };
  const obj2 = {
    c: 'cc',
    d: 'dd',
  };

  expect(includeSamePropertyValue(obj1, obj2)).toBeFalsy();
});
