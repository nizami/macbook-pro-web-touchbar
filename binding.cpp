// #include <napi.h>

// using namespace Napi;

// String Hello(const CallbackInfo &info)
// {
//   return String::New(info.Env(), "world");
// }

// void Init(Env env, Object exports, Object module)
// {
//   exports.Set("hello", Function::New(env, Hello));
// }

// NODE_API_MODULE(addon, Init)

// contents of addon_source.cc

  // This is a basic addon - a binding.gyp file 
  // would need to include this file as it's source.

  #include <nan.h>
  using namespace std;
  using namespace Nan;
  using namespace v8;

  // Accepts 1 number from JavaScript, adds 42 and returns the result.
  NAN_METHOD(PassNumber) {
    Nan::Maybe<double> value = Nan::To<double>(info[0]); 
    Local<Number> retval = Nan::New(value.FromJust() + 42);
    info.GetReturnValue().Set(retval);    
  }

  // Called by the NODE_MODULE macro below, 
  // exposes a pass_number method to JavaScript, which maps to PassNumber 
  // above.
  NAN_MODULE_INIT(Init) {
     Nan::Set(target, New<String>("pass_number").ToLocalChecked(),
        GetFunction(New<FunctionTemplate>(PassNumber)).ToLocalChecked());
  }

  // macro to load the module when require'd
  NODE_MODULE(my_addon, Init)