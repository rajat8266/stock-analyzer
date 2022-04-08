self: super: {
  # custom version of nodejs
  nodejs-12 = builtins.fetchTarball {
    url = "https://nodejs.org/dist/v16.14.2/node-v16.14.2-linux-x64.tar.xz";
    sha256 = "01sx9kdx8mrpjkxfwnf66lwbwi8mazbmfxhkapnnyxkibialkvjz";
  };

  # override the nodejs dependency of yarn
  yarn = super.yarn.override {
    nodejs = self.nodejs-12;
  };

  # TODO: combine the following with the yarn overlay above
  # yarn = builtins.fetchTarball {
  #   url = "https://yarnpkg.com/downloads/1.22.4/yarn-v1.22.4.tar.gz";
  #   sha256 = "1s054c9cmlmzy6cfkawhaxvaxhqcq0a17n4sb12p0bp2lzkax9lm";
  # };
}
