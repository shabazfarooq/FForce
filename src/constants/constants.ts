/**
 * Define and export module
 */
module.exports = (() => {

  const getBuildProperties = (username: string,
                              password: string,
                              serverurl: string) => {
    return `org = src`
    + `\nsf.username = ${username}`
    + `\nsf.password = ${password}`
    + `\nsf.serverurl = ${serverurl}`
    + `\nsf.maxPoll = 20`;
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

              <!-- Custom Pull Task - pulls metadata defined in src/package.xml to src/ -->
              <target name="pull">
                <sf:retrieve username="\${sf.username}" password="\${sf.password}" sessionId="\${sf.sessionId}" serverurl="\${sf.serverurl}" maxPoll="\${sf.maxPoll}" retrieveTarget="src" unpackaged="src/package.xml"/>
              </target>
          </project>
          `
  }

  return {
    getBuildProperties,
    getBuildXml
  }

})();