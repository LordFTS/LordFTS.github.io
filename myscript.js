const getNFTsBtn = document.getElementById("get-nfts-btn");
const nftGrid = document.querySelector(".nft-grid");

getNFTsBtn.addEventListener("click", async () => {
  const walletAddressInput = document.getElementById("wallet-address-input");
  const walletAddress = walletAddressInput.value;

  if (walletAddress) {
    const nftCollection = await getUserNFTs(walletAddress);
    displayNFTs(nftCollection, nftGrid);
  }
});

function displayNFTs(nftCollection, container) {
  container.innerHTML = ""; // Clear the container

  nftCollection.forEach((nft) => {
    const nftElement = document.createElement("div");
    nftElement.classList.add("nft");

    // Create an image element for each NFT and set the source to the tokenURI
    const imageElement = document.createElement("img");
    imageElement.src = nft.tokenURI;
    imageElement.alt = "NFT Image";
    nftElement.appendChild(imageElement);

    // Append the NFT element to the container
    container.appendChild(nftElement);
  });
}

async function getUserNFTs(walletAddress) {
  try {
    const contractABIResponse = await fetch("eyewrap_abi.json");
    const contractABI = await contractABIResponse.json();

    const web3 = new Web3(Web3.givenProvider);
    const contractAddress = "0x5779Ab0e844fC3785fAB17867B8B67bC4ff7A37B";
    const contractInstance = new web3.eth.Contract(contractABI, contractAddress);

    const tokenIdsResponse = await contractInstance.methods.getTokenIdsByOwner(walletAddress).call();
    const tokenIds = tokenIdsResponse.result;

    const nftCollection = [];

    for (const tokenId of tokenIds) {
      const tokenURI = await contractInstance.methods.tokenURI(tokenId).call();
      nftCollection.push({ tokenId, tokenURI });
    }

    return nftCollection;
  } catch (error) {
    console.error(error);
    return [];
  }
}
