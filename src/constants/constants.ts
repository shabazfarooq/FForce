/**
 * Define and export Constants
 */
export default (() => {
  const srcFolder = 'src2';

  const buildPropertiesKeys = {
    username: 'sf.username',
    password: 'sf.password',
    serverurl: 'sf.serverurl',
    maxPoll: 'sf.maxPoll'
  };

  const getBuildProperties = (username: string,
                              password: string,
                              serverurl: string) => {
    return `${buildPropertiesKeys.username} = ${username}`
    + `\n${buildPropertiesKeys.password} = ${password}`
    + `\n${buildPropertiesKeys.serverurl} = ${serverurl}`
    + `\n${buildPropertiesKeys.maxPoll} = 20`;
  }

  const getBuildXml = () => {
    return `<project name="SFDC" default="test" basedir="." xmlns:sf="antlib:com.salesforce">

              <property file="build.properties"/>
              <property environment="env"/>

              <condition property="sf.username" value=""> <not> <isset property="sf.username"/> </not> </condition>
              <condition property="sf.password" value=""> <not> <isset property="sf.password"/> </not> </condition>
              <condition property="sf.sessionId" value=""> <not> <isset property="sf.sessionId"/> </not> </condition>

              <taskdef resource="com/salesforce/antlib.xml" uri="antlib:com.salesforce">
                  <classpath>
                      <pathelement location="../ant-salesforce.jar" />
                  </classpath>
              </taskdef>

              <target name="pull">
                <sf:retrieve`
                  + '\nusername="${' + buildPropertiesKeys.username + '}"'
                  + '\npassword="${' + buildPropertiesKeys.password + '}"'
                  + '\nserverurl="${' + buildPropertiesKeys.serverurl + '}"'
                  + '\nmaxPoll="${' + buildPropertiesKeys.maxPoll + '}"'
                  + '\nretrieveTarget="' + srcFolder + '"'
                  + '\nunpackaged="' + srcFolder + '/package.xml"/>' +
              `</target>
          </project>
          `;
  }

  const getPackageXml = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
              <Package xmlns="http://soap.sforce.com/2006/04/metadata">
                  <types>
                      <members>*</members>
                      <name>ApexClass</name>
                  </types>
                  <types>
                      <members>*</members>
                      <name>ApexComponent</name>
                  </types>
                  <types>
                      <members>*</members>
                      <name>ApexPage</name>
                  </types>
                  <types>
                      <members>*</members>
                      <name>ApexTrigger</name>
                  </types>
                  <types>
                      <members>*</members>
                      <name>StaticResource</name>
                  </types>
                  <version>40.0</version>
              </Package>
              `;
  }

  return {
    srcFolder,
    buildPropertiesKeys,
    getBuildProperties,
    getBuildXml,
    getPackageXml
  }

})();