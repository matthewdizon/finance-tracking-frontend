module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/transactions",
        destination: "http://localhost:4000/api/transactions",
      },
      {
        source: "/api/transactions/:id",
        destination: "http://localhost:4000/api/transactions/:id",
      },
    ];
  };
  return {
    rewrites,
  };
};
