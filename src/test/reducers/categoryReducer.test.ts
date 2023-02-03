import { addCatAndImage, addCategoryToServer, updateCategory } from '../../redux/reducers/categoryReducer';
import server from '../shared/server';
import { store } from '../../redux/store';
import { fetchAllCategories } from '../../redux/reducers/categoryReducer';
import { Category } from '../../types/common';

// Import server from shared, this will be a mock server and would be used when the project start
beforeAll(() => server.listen());
afterAll(() => server.close());

describe('Test categoryReducer', () => {
  test('Should return initial state', () => {
    expect(store.getState().categoryReducer.length).toBe(0);
  });

  test('Should fetch all cats', async () => {
    await store.dispatch(fetchAllCategories());
    expect(store.getState().categoryReducer.length).toBe(3);
    console.log(store.getState().categoryReducer);
  });

  test('Should add category', async () => {
    // Dummy product to test mock server
    const newCat: Category = {
      id: 56,
      name: 'Shoes',
      image: 'https://api.lorem.space/image/shoes?w=640&h=480&r=1570',
    };
    await store.dispatch(addCategoryToServer(newCat));
  });

  test('Should touch the cat', async () => {
    await store.dispatch(updateCategory({ id: 2, update: { name: 'Home Appliances' } }));
    const category = store.getState().categoryReducer.find((category: Category) => category.id === 2);
    expect(category?.name).toBe('Home Appliances');
  });

  test('Should add cat with uploaded images', async () => {
    const image: File = {
      lastModified: 0,
      name: 'test file img',
      webkitRelativePath: '',
      size: 0,
      type: '',
      arrayBuffer: function (): Promise<ArrayBuffer> {
        throw new Error('Function not implemented.');
      },
      slice: function (start?: number | undefined, end?: number | undefined, contentType?: string | undefined): Blob {
        throw new Error('Function not implemented.');
      },
      stream: function () {
        throw new Error('Function not implemented.');
      },
      text: function (): Promise<string> {
        throw new Error('Function not implemented.');
      },
    };

    const category: Category = {
      id: 34,
      name: 'Umbrella',
      image: '',
    };
    await store.dispatch(addCatAndImage({ image, category }));
    console.log(store.getState().categoryReducer);
  });
});
