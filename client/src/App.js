import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Questions from './pages/Questions';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/signup';
import Navbar from './pages/Navbar';
import Footer from './pages/footer';
import About from './pages/About';
import Contact from './pages/Contact';


const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Navbar />
          <Routes>
            <Route 
              path="/" 
              element={<Home />}
            />
            <Route 
              path="/signup" 
              element={<Signup />}
            />
             <Route 
              path="/login" 
              element={<Login />}
            />
              <Route
              path="/question"
              element={<Questions />}
            />
             <Route 
              path="/about"
              element={<About />}
            />
             <Route
              path="/contact"
              element={<Contact />}
            />
            <Route 
              path="*"
              element={<NotFound />}
            />
          </Routes>
        </div>
      </Router>
      <Footer />
    </ApolloProvider>
  );
}

export default App;
