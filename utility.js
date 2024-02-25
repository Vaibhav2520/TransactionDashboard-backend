// code for totalAmount ---------------------------

const  totalAmount = (products,monthNumber) => {
    let totalAmount = 0;
    products.forEach((product) => {
      if (product.sold) {
        const date = new Date(product.dateOfSale);
        // Get the month number (0-indexed, so January is 0)
        const month = date.getMonth() + 1; // Adding 1 to get 1-indexed month
  
        if (month === monthNumber) {
          totalAmount += product.price;
        }
      }
    });
    return totalAmount;
}


// code for totalsold---------------------------------


 const totalsold = (products,monthNumber) =>{
    let totalItems = 0;
  products.forEach((product) => {
    if (product.sold) {
      const date = new Date(product.dateOfSale);
      // Get the month number (0-indexed, so January is 0)
      const month = date.getMonth() + 1; // Adding 1 to get 1-indexed month

      if (month === monthNumber) {
        totalItems++;
      }
    }
  });

  return totalItems;
}

// code for totalNotsold---------------------------------

 const totalNotsold = (products,monthNumber) =>{
    let totalItems = 0;
  products.forEach((product) => {
    if (!product.sold) {
      const date = new Date(product.dateOfSale);
      // Get the month number (0-indexed, so January is 0)
      const month = date.getMonth() + 1; // Adding 1 to get 1-indexed month

      if (month === monthNumber) {
        totalItems++;
      }
    }
  });

  return totalItems;
}


// pie chart api price range

 const getPieChartPriceRange = (products,monthNumber) =>{
    let response = {
        "- 0 - 100": 0,
        "- 101 - 200": 0,
        "- 201-300": 0,
        "- 301-400": 0,
        "- 401-500": 0,
        "- 501 - 600": 0,
        "- 601-700": 0,
        "- 701-800": 0,
        "- 801-900": 0,
        "- 901-above": 0,
      };
      products.forEach((product) => {
        const date = new Date(product.dateOfSale);
        // Get the month number (0-indexed, so January is 0)
        const month = date.getMonth() + 1; // Adding 1 to get 1-indexed month
    
        if (month === monthNumber) {
          switch (true) {
            case product.price > 0 && product.price <= 100:
              response["- 0 - 100"]++;
              break;
            case product.price > 101 && product.price <= 200:
              response["- 101 - 200"]++;
              break;
            case product.price > 200 && product.price <= 300:
              response["- 201-300"]++;
              break;
            case product.price > 300 && product.price <= 400:
              response["- 301-400"]++;
              break;
            case product.price > 400 && product.price <= 500:
              response["- 401-500"]++;
              break;
            case product.price > 500 && product.price <= 600:
              response["- 501 - 600"]++;
              break;
            case product.price > 600 && product.price <= 700:
              response["- 601-700"]++;
              break;
            case product.price > 700 && product.price <= 800:
              response["- 701-800"]++;
              break;
            case product.price > 800 && product.price <= 900:
              response["- 801-900"]++;
              break;
            case product.price > 900:
              response["- 901-above"]++;
              break;
    
            default:
              break;
          }
        }
      });

      return response;
}


// code to fetch pie chart date for categories --------------------------------------------------

 const getCategories = (uniqueCategories,products,monthNumber) =>{

    let response = {};

  uniqueCategories.forEach((category) => {
    response[category] = 0;
  });

  products.forEach((product) => {
    const date = new Date(product.dateOfSale);
    // Get the month number (0-indexed, so January is 0)
    const month = date.getMonth() + 1; // Adding 1 to get 1-indexed month

    if (month === monthNumber) {
      response[product.category]++;
    }
  });
  return response;
}


module.exports = { totalAmount,totalsold,totalNotsold,getPieChartPriceRange,getCategories };
