#include <node.h>
#include <v8.h>

using namespace v8;

Handle<Value> Method(const Arguments& args) {
	HandleScope scope;
	return scope.Close(String::New("Hello World!"));
}

void init(Handle<Object> target) {
	target->Set(String::NewSymbol("hello"),
		FunctionTemplate::New(Method)->GetFunction());
}

NODE_MODULE(hello, init)