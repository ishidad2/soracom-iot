var express = require('express');
var router = express.Router();
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config({ path: path.join(__dirname, "../config/.env")});
const sym = require('symbol-sdk');
const node = process.env.NODE_URL;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

router.get('/v1/soracom',  async function(req, res, next) {
  const repo = new sym.RepositoryFactoryHttp(node);
  const networkRepo = repo.createNetworkRepository();
  const networkType = await networkRepo.getNetworkType().toPromise();

  res.send({node: node, networkType: networkType == sym.MAIN_NET ? "MAIN_NET" : "TEST_NET"});
});

router.post('/v1/soracom', async function(req, res, next) {
  const repo = new sym.RepositoryFactoryHttp(node);
  const txRepo = repo.createTransactionRepository();
  const networkRepo = repo.createNetworkRepository();
  const networkType = await networkRepo.getNetworkType().toPromise();
  const medianFeeMultiplier = (await networkRepo.getTransactionFees().toPromise()).medianFeeMultiplier;
  const epochAdjustment = await repo.getEpochAdjustment().toPromise();
  const networkGenerationHash = await repo.getGenerationHash().toPromise();
  const signerAddress = sym.Account.createFromPrivateKey(process.env.CERTIFICATE_PRIVATE_KEY, networkType); //送信元アドレス
  const strMessage = JSON.stringify(req.body);

  const tx = sym.TransferTransaction.create(
    sym.Deadline.create(epochAdjustment),
    signerAddress.address,
    [],
    sym.PlainMessage.create(strMessage),
    networkType,
  ).setMaxFee(medianFeeMultiplier);

  //署名して送信
  const signedtxd = signerAddress.sign(tx, networkGenerationHash);

  console.log("hash:"+signedtxd.hash);
  console.log("payload:"+signedtxd.payload);

  txRepo.announce(signedtxd).subscribe((x)=>console.log(x),(er)=>console.log(er));
  
  res.send("ok");
});

module.exports = router;
