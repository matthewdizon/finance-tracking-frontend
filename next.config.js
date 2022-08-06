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
      {
        source: "/api/wallets/:id",
        destination: `${process.env.BACKEND_SERVER}/api/wallets/:id`,
      },
    ];
  };
  return {
    rewrites,
    images: {
      domains: ["localhost", "lh3.googleusercontent.com"], // <== Domain name
    },
  };
};
