package org.json;

import org.junit.*;
import static org.junit.Assert.*;

public class JSONTest {

private final JSONArray array= new JSONArray();
private final JSONObject object = new JSONObject();

@Before public void setUp() throws Exception {
	// {"A":{}, "B":["one","two","three"]}
	this.object.accumulate("A", new JSONObject());
	this.object.accumulate("B", "one");
	this.object.accumulate("B", "two");
	this.object.accumulate("B", "three");
}

@Test public void getAllJSONObjects() throws Exception {
	assertEquals(1, this.object.getAllJSONObjects("A").size());
}

@Test public void removeKeyValue() throws Exception {
	this.object.remove("B","two");
	this.object.remove("B","one");
	assertEquals(1, this.object.getJSONArray("B").length());
	this.object.remove("B","three");
	assertEquals(1, this.object.length());
}

@Test public void indexOf() throws Exception {
	assertEquals(1, this.object.getJSONArray("B").indexOf("two"));
}

@Test public void contains() throws Exception {
	assertTrue(this.object.getJSONArray("B").contains("two"));
	assertFalse(this.object.getJSONArray("B").contains("four"));
}

@Test public void removeValue() throws Exception {
	this.object.getJSONArray("B").remove("two");
	assertFalse(this.object.getJSONArray("B").contains("two"));
}

/**
 * Input:
 *   {key0:{attribute0:value0}}
 *   {key0:{attribute4:value7}}
 *   {key0:{type0:{attribute1:value2, attribute2:value3}}}
 *   {key0:{attribute0:value1, attribute3:value6}}
 *   {key0:{type0:{attribute1:value4, attribute2:value5}}}
 *   {key0:{type1:{attribute1:value8, attribute2:value9}}}
 *   {key0:{type1:[{attribute1:value10, attribute2:value11}],
 *     {attribute1:value12, attribute2:value13}]}}
 * Output:
 *   {key0:{
 *     attribute0:[value0,value1], attribute3:value6, attribute4:value7
 *     type0:[
 *       {attribute1:value2, attribute2:value3},
 *       {attribute1:value4, attribute2:value5}
 *     ], type1:[
 *       {attribute1:value8, attribute2:value9},
 *       {attribute1:value10, attribute2:value11},
 *       {attribute1:value12, attribute2:value13}
 *     ]
 *   }}
 */ 
@Test public void putAll() throws Exception {
  JSONObject o = new JSONObject(
    "{key0:{attribute0:value0}}"
  ).putAll(new JSONObject(
    "{key0:{attribute4:value7}}"
  )).putAll(new JSONObject(
    "{key0:{type0:{attribute1:value2, attribute2:value3}}}"
  )).putAll(new JSONObject(
    "{key0:{attribute0:value1, attribute3:value6}}"
  )).putAll(new JSONObject(
    "{key0:{type0:{attribute1:value4, attribute2:value5}}}"
  )).putAll(new JSONObject(
    "{key0:{type1:{attribute1:value8, attribute2:value9}}}"
  )).putAll(new JSONObject(
    "{key0:{type1:[{attribute1:value10, attribute2:value11},"
    + "{attribute1:value12, attribute2:value13}]}}"
  ));
  assertEquals(JSONArray.class, o.getJSONObject("key0").get("attribute0").getClass());
  assertEquals(JSONArray.class, o.getJSONObject("key0").get("type0").getClass());
  assertEquals(3, o.getJSONObject("key0").getJSONArray("type1").length());
}

}
