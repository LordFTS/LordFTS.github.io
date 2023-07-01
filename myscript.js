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
  const nftCollection = [];
  const nftContracts = [
    { address: "0x45408Ce844d0bf5061e9B25C2924aaDe4DF884b3", abi: null },
    // Add more contracts here
  ];
  for (const contract of nftContracts) {
    const response = await fetch("eyewrap_abi.json");
    const abi = await response.json();
    contract.abi = abi;
    
    const nftContract = new web3.eth.Contract(abi, contract.address);
    const userNFTs = await nftContract.methods.getNFTCollection(walletAddress).call();
    nftCollection.push(...userNFTs);
  }
  return nftCollection;
}
