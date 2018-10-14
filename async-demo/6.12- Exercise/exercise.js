
/* getCustomer(1, (customer) => {
  console.log('Customer: ', customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log('Top movies: ', movies);
      sendEmail(customer.email, movies, () => {
        console.log('Email sent...')
      });
    });
  }
}); */

//Async and await

async function displayCustomers(){
  try {
    const customer = await getCustomer(1);
    console.log("Customer: ", customer);
    
    if(customer.isGold) {
      const topMV = await getTopMovies();
      console.log('Movies: ', topMV);
      await sendEmail(customer.email, topMV);
      console.log("Email sent...");
    }
  } catch (error) {
    console.log("Error: ", error.message);
  }
};

displayCustomers();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  })
  
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  })
  
}

function sendEmail(email, movies) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  })
}