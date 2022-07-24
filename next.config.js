module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/transactions",
        destination: "http://localhost:4000/api/transactions",
      },
    ];
  };
  return {
    rewrites,
  };
};
