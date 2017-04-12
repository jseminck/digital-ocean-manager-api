import DigitalOcean from "do-wrapper";

async function start(req, res) {
  const dropletId = req.query.id;

  try {
    await digitalOcean().dropletsRequestAction(dropletId, {type: "power_on"});
    res.status(200).send({data: "success"});
  } catch (e) {
    res.status(500).send({'error': e});
  }
}

async function stop(req, res) {
    const dropletId = req.query.id;

    try {
      await digitalOcean().dropletsRequestAction(dropletId, {type: "power_off"});
      return res.status(200).send({data: "success"});
    } catch (e) {
      return res.status(500).send({'error': e});
    }
}

async function account(req, res) {
  try {
    const account = await digitalOcean().account();
    res.status(200).send({'data': account});
  } catch (e) {
    res.status(500).send({'error': e});
  }
}

async function droplets(req, res) {
  try {
    const droplets = await digitalOcean().dropletsGetAll({});
    res.status(200).send({'data': droplets});
  } catch (e) {
    res.status(500).send({'error': e});
  }
}

function digitalOcean() {
  const digitalOceanApiKey = process.env.AWS_ACCESS_KEY_ID;

  console.log("digitalOceanApiKey", digitalOceanApiKey);
  return new DigitalOcean("d1d83e800bcd1a25a484102bfeeafd03e3c96c25067176b4ff50f0802ec108b2");
}

export default function configureAwsRoutes (app) {
    app.route('/api/start').get(start);
    app.route('/api/stop').get(stop);
    app.route('/api/account').get(account);
    app.route('/api/droplets').get(droplets);
}

// Exporting the routes for unit testing.
export { start, stop, account, droplets };
