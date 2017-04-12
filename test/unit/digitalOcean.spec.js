import proxyquire from 'proxyquire';

const digitalOceanApi = {
    dropletsRequestAction: sinon.stub(),
    account: sinon.stub(),
    dropletsGetAll: sinon.stub()
};

var stubs = {
    'do-wrapper': () => {
        return digitalOceanApi;
    }
};

var digitalOcean = proxyquire('./../../lib/routes/digitalOcean', stubs);

describe('/api', function () {
    beforeEach(function() {
        this.response = {
            send: sinon.spy(),
            status: sinon.stub()
        };

        // Make sure that res.status() returns res.send()
        this.response.status.returns({send: this.response.send});
    });

    describe('GET /start', function() {
        beforeEach(function() {
            this.getStart = function(query) {
                return digitalOcean.start({query}, this.response);
            };
        });

        describe("when no error on digital ocean side", function() {
            beforeEach(async function(done) {
                digitalOceanApi.dropletsRequestAction.returns(new Promise((resolve) => resolve()));
                await this.getStart({id: "123"});
                done();
            });

            it("called dropletsRequestAction with the correct id and action type", function() {
               expect(digitalOceanApi.dropletsRequestAction).to.have.been.calledWith("123", {type: "power_on"});
            });

            it("returns success", function() {
                expect(this.response.send).to.have.been.calledWith({data: "success"});
            });
        });

        describe("when error on digital ocean side", function() {
            beforeEach(async function(done) {
                digitalOceanApi.dropletsRequestAction.returns(new Promise((resolve, reject) => reject({myErrorReason: "myErrorValue"})));
                await this.getStart({id: "123"});
                done();
            });

            it("returns error from digital ocean", function() {
                expect(this.response.send).to.have.been.calledWith({error: {myErrorReason: "myErrorValue"}});
            });
        });
    });

    describe('GET /stop', function() {
        beforeEach(function() {
            this.getStop = function(query) {
                return digitalOcean.stop({query}, this.response);
            };
        });

        describe("when no error on digital ocean side", function() {
            beforeEach(async function(done) {
                digitalOceanApi.dropletsRequestAction.returns(new Promise((resolve) => resolve()));
                await this.getStop({id: "123"});
                done();
            });

            it("called dropletsRequestAction with the correct id and action type", function() {
               expect(digitalOceanApi.dropletsRequestAction).to.have.been.calledWith("123", {type: "power_off"});
            });

            it("returns success from digital ocean", function() {
                expect(this.response.send).to.have.been.calledWith({data: "success"});
            });
        });

        describe("when error on digital ocean side", function() {
            beforeEach(async function(done) {
                digitalOceanApi.dropletsRequestAction.returns(new Promise((resolve, reject) => reject({myErrorReason: "myErrorValue"})));
                await this.getStop({id: "123"});
                done();
            });

            it("returns error", function() {
                expect(this.response.send).to.have.been.calledWith({error: {myErrorReason: "myErrorValue"}});
            });
        });
    });

    describe('GET /account', function() {
        beforeEach(function() {
            this.getAccount = function() {
                return digitalOcean.account({}, this.response);
            };
        });

        describe("when no error on digital ocean side", function() {
            beforeEach(async function(done) {
                digitalOceanApi.account.returns(new Promise((resolve) => resolve({account: "myAccount"})));
                await this.getAccount()
                done();
            });

            it("called account with no parameters", function() {
               expect(digitalOceanApi.account).to.have.been.calledWith();
            });

            it("returns the data from digital ocean api", function() {
                expect(this.response.send).to.have.been.calledWith({data: {account: "myAccount"}});
            });
        });

        describe("when error on digital ocean side", function() {
            beforeEach(async function(done) {
                digitalOceanApi.account.returns(new Promise((resolve, reject) => reject({myErrorReason: "myErrorValue"})));
                await this.getAccount();
                done();
            });

            it("returns error from digital ocean", function() {
                expect(this.response.send).to.have.been.calledWith({error: {myErrorReason: "myErrorValue"}});
            });
        });
    });

    describe('GET /droplets', function() {
        beforeEach(function() {
            this.getDroplets = function() {
                return digitalOcean.droplets({}, this.response);
            };
        });

        describe("when no error on digital ocean side", function() {
            beforeEach(async function(done) {
                digitalOceanApi.dropletsGetAll.returns(new Promise((resolve) => resolve({droplets: "myDroplets"})));
                await this.getDroplets()
                done();
            });

            it("called account with no parameters", function() {
               expect(digitalOceanApi.dropletsGetAll).to.have.been.calledWith();
            });

            it("returns the data from digital ocean api", function() {
                expect(this.response.send).to.have.been.calledWith({data: {droplets: "myDroplets"}});
            });
        });

        describe("when error on digital ocean side", function() {
            beforeEach(async function(done) {
                digitalOceanApi.dropletsGetAll.returns(new Promise((resolve, reject) => reject({myErrorReason: "myErrorValue"})));
                await this.getDroplets();
                done();
            });

            it("returns error from digital ocean", function() {
                expect(this.response.send).to.have.been.calledWith({error: {myErrorReason: "myErrorValue"}});
            });
        });
    });
});