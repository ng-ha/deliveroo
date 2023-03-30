import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: 'qwoxusny',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-10-21',

  // projectId: 'uywf9foy', //my projectId
});
const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
// RUN THIS (in sanity project folder) to add exception for localhost 3000 CORS policy
// sanity cors add http://localhost:3000

export default client;
