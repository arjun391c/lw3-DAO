const { ethers } = require("hardhat");
const { CRYPTODEVS_NFT_CONTRACT_ADDRESS } = require("../constants");

async function main() {
    // Deploy the FakeNFTMarketplace contract first
    const FakeNFTMarketplace = await ethers.getContractFactory(
        "FakeNFTMarketplace"
    );
    const fakeNftMarketplace = await FakeNFTMarketplace.deploy();
    await fakeNftMarketplace.deployed();

    console.log("FakeNFTMarketplace deployed to: ", fakeNftMarketplace.address);

    // Now deploy the CryptoDevsDAO contract
    const CryptoDevsDAO = await ethers.getContractFactory("CryptoDevsDAO");
    const cryptoDevsDAO = await CryptoDevsDAO.deploy(
        fakeNftMarketplace.address,
        CRYPTODEVS_NFT_CONTRACT_ADDRESS,
        {
            // This assumes your account has at least 1 ETH in it's account
            // Change this value as you want
            value: ethers.utils.parseEther("0.05"),
        }
    );
    await cryptoDevsDAO.deployed();

    console.log("CryptoDevsDAO deployed to: ", cryptoDevsDAO.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


/* 
    FakeNFTMarketplace deployed to:  0x3A0E5d22783868e0cb6A5d546117252a56e27f78
    CryptoDevsDAO deployed to:  0xd3C4BF0601945529BCc3Cbb1AC6a69f78C11bc91
*/