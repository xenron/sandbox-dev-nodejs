#include <node.h>
#include <ctime>

using namespace v8;

Handle<Value> GetTime(const Arguments& args) {
	HandleScope scope;

	Local<Function> cb = Local<Function>::Cast(args[0]);
	const unsigned argc = 1;
	time_t stamp = time(0);
	Local<Value> argv[argc] = { 
		Local<Value>::New(Number::New(stamp)) 
	};
	cb->Call(Context::GetCurrent()->Global(), argc, argv);

  	return scope.Close(Undefined());
}

void Init(Handle<Object> exports, Handle<Object> module) {
	module->Set(String::NewSymbol("exports"),
    FunctionTemplate::New(GetTime)->GetFunction());
}

NODE_MODULE(callback, Init)