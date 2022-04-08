# Stock Analyzer

Project Structure
=================

**analyzer-go** - Contains code that deploys backend on port 1212 which is written in Golang.

**analyzer-react** - Contains code that deploys frontend on port 3000 which is written in React.

**stock-data**  - Contains either downloaded files from code/ manually uploaded files of historical data of stocks.

**nix-files** - Contains dependency for nix env.




Installtions
=================

* Install Nix using "https://nixos.org/download.html".
* Install Golang using "https://go.dev/doc/install"  TODO: Add Golang in Nix Scripts.
* Install & Run Local MongoDb Service using "https://www.geeksforgeeks.org/how-to-install-and-configure-mongodb-in-ubuntu/"

Run
=================

__Terminal 1__
Open terminal and run these:
* nix-shell
* cd analyzer-react
* yarn install (** first time)
* yarn start



__Terminal 2__
Open terminal and run these:
* cd analyzer-go
* cd cmd/create-analysis
* go build
* ./create-analysis
