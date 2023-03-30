import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import CategoryCard from './CategoryCard';
import client, { urlFor } from '../../sanity';

// const img = require('../../assets/images/4.jpeg');

const Categories = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    client
      .fetch(
        `
    *[_type == "category"]`
      )
      .then((data) => setCategories(data));
  }, []);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        padding: 12,
      }}
    >
      {categories.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
