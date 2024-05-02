{
  description = "A js development environment";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils = {
      inputs.nixpkgs.follows = "nixpkgs-unstable";
      url = "github:numtide/flake-utils";
    };
    nixpkgs-unstable.url = "github:nixos/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [];
        };
        unstable = import <nixos-unstable> { config = { allowUnfree = true; }; };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_20
            yarn
            surrealdb
            unstable.surrealist
          ];
        };
         nixpkgs.config.allowUnfreePredicate = pkg: builtins.elem (nixpkgs.lib.getName pkg) [
             "surrealdb"
         ];
        
      });
}
