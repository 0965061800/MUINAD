const flattenCategories = (categories) => {
    let options = [];
    
    const recurse = (cats) => {
      cats.forEach(cat => {
        options.push({ catId: cat.catId, catName: cat.catName});
        if (cat.subCategoryDto && cat.subCategoryDto.length > 0) {
          recurse(cat.subCategoryDto);
        }
      });
    };
  
    recurse(categories);
    return options;
  };

export default flattenCategories;