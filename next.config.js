module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/transactions",
        destination: `${process.env.BACKEND_SERVER}/api/transactions`,
      },
      {
        source: "/api/transactions/:id",
        destination: `${process.env.BACKEND_SERVER}/api/transactions/:id`,
      },
      {
        source: "/api/wallets",
        destination: `${process.env.BACKEND_SERVER}/api/wallets`,
      },
    ];
  };
  return {
    rewrites,
  };
};
