class ResponseData {
  constructor(_builder) {
    this.success = _builder.success;
    this.message = _builder.message;
    this.error = _builder.error;
    this.data = _builder.data;
  }
}
class ResponseDataBuilder {
  constructor() {
    this.success = false;
    this.message = null;
    this.error = null;
    this.data = null;
  }
  setSuccess(success) {
    this.success = success;
    return this;
  }
  setMessage(message) {
    this.message = message;
    return this;
  }
  setError(error) {
    this.error = error;
    return this;
  }
  setData(data) {
    this.data = data;
    return this;
  }
  build() {
    return new ResponseData(this);
  }
}

module.exports = { ResponseDataBuilder, ResponseData };
