const { expect } = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("ECommerce", () => {
  let ecomContract;
  let deployer, buyer;

  beforeEach(async () => {
    [deployer, buyer] = await ethers.getSigners();
    const EcomContract = await ethers.getContractFactory("ECommerce")
    ecomContract = await EcomContract.deploy();
  })

  describe("Deployment", () => {

    it('Sets the owner', async () => {
      expect(await ecomContract.owner()).to.equal(deployer.address)
    })
  })

  describe("listing", () => {
    let transaction;

    beforeEach(async () => {
     transaction= await ecomContract.connect(deployer).listProducts(
        1,"Shoes", "Clothing","IMAGE",1,4,5
      );
      await transaction.wait()
    })

    it('returns item attribute', async () => {
      const item = await ecomContract.items(1);
      expect(item.id).to.equal(1);
    })
  })
})