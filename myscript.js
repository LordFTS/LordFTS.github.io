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

async function getUser

