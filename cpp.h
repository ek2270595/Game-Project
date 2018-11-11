//SCORN
//https://github.com/ek2270595
//Created by: Everett "Daeda" Kirkingburg
//Date: 11/11/2018
#include <iostream>  //std::cin, std::cout
#include <fstream>   //file stream
#include<cmath>      //mathematical functions
using namespace std; //rid of annoying 'std::'
//GLOBAL DATA
	int *point=NULL;
	bool yes=true;
	bool no=false;
	int var=0;
	int length=1;
	float flow=0.0;
	char word[length]={'\0'};
/*
//STRUCTURE
int struct(int a, bool b, char c[length]={}, long d){
	protected void pro(){
	}
	public int pub(){
	}
	return pub();
}
*/
//Funtion Prototypes
char Speech(bool t, int i, char s[length]){};
//SPEECH
Speech(t,i,s){
	t=yes;
//  h=hello!;
	i=this.i;
//  s[i]=for(i;i<=length;i++){return(word[i]);}
	char str[256];
	cout << "What? ";
	cin.get (str,256);    //get c-string
	ifstream is(str);     //open file
	char c;
	while (is.get(c))     //loop getting single characters
	cout << c;
	is.close();           //close file
	return NULL;
}
