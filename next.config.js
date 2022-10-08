module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/transactions",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/transactions`,
      },
      {
        source: "/api/transactions/:id",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/transactions/:id`,
      },
      {
        source: "/api/wallets",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/wallets`,
      },
      {
        source: "/api/wallets/:id",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/wallets/:id`,
      },
    ];
  };
  // const headers = async () => {
  //   return [
  //     {
  //       // matching all API routes
  //       source: "/api/:path*",
  //       headers: [
  //         { key: "Access-Control-Allow-Credentials", value: "true" },
  //         { key: "Access-Control-Allow-Origin", value: "*" },
  //         {
  //           key: "Access-Control-Allow-Methods",
  //           value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  //         },
  //         {
  //           key: "Access-Control-Allow-Headers",
  //           value:
  //             "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
  //         },
  //       ],
  //     },
  //   ];
  // };
  return {
    rewrites,
    // headers,
    images: {
      domains: ["localhost", "lh3.googleusercontent.com"], // <== Domain name
    },
  };
};
