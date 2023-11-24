# CDKTF Local Exec Construct

![Status: Tech Preview](https://img.shields.io/badge/status-experimental-EAAA32) [![Releases](https://img.shields.io/github/release/cdktf/cdktf-local-exec.svg)](https://github.com/cdktf/cdktf-local-exec/releases)
[![LICENSE](https://img.shields.io/github/license/cdktf/cdktf-local-exec.svg)](https://github.com/cdktf/cdktf-local-exec/blob/main/LICENSE)
[![build](https://github.com/cdktf/cdktf-local-exec/actions/workflows/build.yml/badge.svg)](https://github.com/cdktf/cdktf-local-exec/actions/workflows/build.yml)

A simple construct that executes a command locally. This is useful to run build steps within your CDKTF Program or to run a post action after a resource is created.

_cdktf-local-exec_ is in technical preview, which means it's a community supported project. It still requires extensive testing and polishing to mature into a HashiCorp officially supported project. Please [file issues](https://github.com/cdktf/cdktf-local-exec/issues/new/choose) generously and detail your experience while using the library. We welcome your feedback.

By using the software in this repository, you acknowledge that:
* _cdktf-local-exec_ is still in development, may change, and has not been released as a commercial product by HashiCorp and is not currently supported in any way by HashiCorp.
* _cdktf-local-exec_ is provided on an "as-is" basis, and may include bugs, errors, or other issues.
* _cdktf-local-exec_ is NOT INTENDED FOR PRODUCTION USE, use of the Software may result in unexpected results, loss of data, or other unexpected results, and HashiCorp disclaims any and all liability resulting from use of _cdktf-local-exec_.
* HashiCorp reserves all rights to make all decisions about the features, functionality and commercial release (or non-release) of _cdktf-local-exec_, at any time and without any obligation or liability whatsoever.

## Compatibility

- `cdktf` >= 0.19.0
- `constructs` >= 10.0.25

## How It Works

The construct uses the null provider to achieve this so it can be trusted to only run after all dependencies are met.

## Usage

```ts
import { Provider, LocalExec } from "cdktf-local-exec";

// LocalExec extends from the null provider,
// so if you already have the provider initialized you can skip this step
new Provider(this, "local-exec");

const frontend = new LocalExec(this, "frontend-build", {
  // Will copy this into an asset directory
  cwd: "/path/to/project/frontend",
  command: "npm install && npm build",
});

const pathToUpload = `${frontend.path}/dist`;

new LocalExec(this, "frontend-upload", {
  cwd: pathToUpload,
  command: `aws s3 cp --recursive ${pathToUpload} s3://${bucket.name}/frontend`,
});

new LocalExec(this, "backend-build", {
  cwd: "/path/to/project/backend",
  copyBeforeRun: false, // can not run remotely since the runner has no docker access
  command: "docker build -t foo . && docker push foo",
});
```

### Options

- `cwd`: The working directory to run the command in. It will be copied before execution to ensure the asset can be used in a remote execution environment.
- `command`: The command to execute.
- `copyBeforeRun`: If true, the command will copy the `cwd` directory into a tmp dir and run there. If false, the command will be executed in the `cwd` directory.

# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### LocalExec <a name="LocalExec" id="cdktf-local-exec.LocalExec"></a>

#### Initializers <a name="Initializers" id="cdktf-local-exec.LocalExec.Initializer"></a>

```typescript
import { LocalExec } from 'cdktf-local-exec'

new LocalExec(scope: Construct, id: string, config: LocalExecConfig)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdktf-local-exec.LocalExec.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.Initializer.parameter.config">config</a></code> | <code><a href="#cdktf-local-exec.LocalExecConfig">LocalExecConfig</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdktf-local-exec.LocalExec.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdktf-local-exec.LocalExec.Initializer.parameter.id"></a>

- *Type:* string

---

##### `config`<sup>Required</sup> <a name="config" id="cdktf-local-exec.LocalExec.Initializer.parameter.config"></a>

- *Type:* <a href="#cdktf-local-exec.LocalExecConfig">LocalExecConfig</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdktf-local-exec.LocalExec.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdktf-local-exec.LocalExec.addOverride">addOverride</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.overrideLogicalId">overrideLogicalId</a></code> | Overrides the auto-generated logical ID with a specific ID. |
| <code><a href="#cdktf-local-exec.LocalExec.resetOverrideLogicalId">resetOverrideLogicalId</a></code> | Resets a previously passed logical Id to use the auto-generated logical id again. |
| <code><a href="#cdktf-local-exec.LocalExec.toMetadata">toMetadata</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.toTerraform">toTerraform</a></code> | Adds this resource to the terraform JSON output. |
| <code><a href="#cdktf-local-exec.LocalExec.addMoveTarget">addMoveTarget</a></code> | Adds a user defined moveTarget string to this resource to be later used in .moveTo(moveTarget) to resolve the location of the move. |
| <code><a href="#cdktf-local-exec.LocalExec.getAnyMapAttribute">getAnyMapAttribute</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.getBooleanAttribute">getBooleanAttribute</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.getBooleanMapAttribute">getBooleanMapAttribute</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.getListAttribute">getListAttribute</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.getNumberAttribute">getNumberAttribute</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.getNumberListAttribute">getNumberListAttribute</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.getNumberMapAttribute">getNumberMapAttribute</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.getStringAttribute">getStringAttribute</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.getStringMapAttribute">getStringMapAttribute</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.importFrom">importFrom</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.interpolationForAttribute">interpolationForAttribute</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.moveTo">moveTo</a></code> | Moves this resource to the target resource given by moveTarget. |
| <code><a href="#cdktf-local-exec.LocalExec.resetTriggers">resetTriggers</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="cdktf-local-exec.LocalExec.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addOverride` <a name="addOverride" id="cdktf-local-exec.LocalExec.addOverride"></a>

```typescript
public addOverride(path: string, value: any): void
```

###### `path`<sup>Required</sup> <a name="path" id="cdktf-local-exec.LocalExec.addOverride.parameter.path"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="cdktf-local-exec.LocalExec.addOverride.parameter.value"></a>

- *Type:* any

---

##### `overrideLogicalId` <a name="overrideLogicalId" id="cdktf-local-exec.LocalExec.overrideLogicalId"></a>

```typescript
public overrideLogicalId(newLogicalId: string): void
```

Overrides the auto-generated logical ID with a specific ID.

###### `newLogicalId`<sup>Required</sup> <a name="newLogicalId" id="cdktf-local-exec.LocalExec.overrideLogicalId.parameter.newLogicalId"></a>

- *Type:* string

The new logical ID to use for this stack element.

---

##### `resetOverrideLogicalId` <a name="resetOverrideLogicalId" id="cdktf-local-exec.LocalExec.resetOverrideLogicalId"></a>

```typescript
public resetOverrideLogicalId(): void
```

Resets a previously passed logical Id to use the auto-generated logical id again.

##### `toMetadata` <a name="toMetadata" id="cdktf-local-exec.LocalExec.toMetadata"></a>

```typescript
public toMetadata(): any
```

##### `toTerraform` <a name="toTerraform" id="cdktf-local-exec.LocalExec.toTerraform"></a>

```typescript
public toTerraform(): any
```

Adds this resource to the terraform JSON output.

##### `addMoveTarget` <a name="addMoveTarget" id="cdktf-local-exec.LocalExec.addMoveTarget"></a>

```typescript
public addMoveTarget(moveTarget: string): void
```

Adds a user defined moveTarget string to this resource to be later used in .moveTo(moveTarget) to resolve the location of the move.

###### `moveTarget`<sup>Required</sup> <a name="moveTarget" id="cdktf-local-exec.LocalExec.addMoveTarget.parameter.moveTarget"></a>

- *Type:* string

The string move target that will correspond to this resource.

---

##### `getAnyMapAttribute` <a name="getAnyMapAttribute" id="cdktf-local-exec.LocalExec.getAnyMapAttribute"></a>

```typescript
public getAnyMapAttribute(terraformAttribute: string): {[ key: string ]: any}
```

###### `terraformAttribute`<sup>Required</sup> <a name="terraformAttribute" id="cdktf-local-exec.LocalExec.getAnyMapAttribute.parameter.terraformAttribute"></a>

- *Type:* string

---

##### `getBooleanAttribute` <a name="getBooleanAttribute" id="cdktf-local-exec.LocalExec.getBooleanAttribute"></a>

```typescript
public getBooleanAttribute(terraformAttribute: string): IResolvable
```

###### `terraformAttribute`<sup>Required</sup> <a name="terraformAttribute" id="cdktf-local-exec.LocalExec.getBooleanAttribute.parameter.terraformAttribute"></a>

- *Type:* string

---

##### `getBooleanMapAttribute` <a name="getBooleanMapAttribute" id="cdktf-local-exec.LocalExec.getBooleanMapAttribute"></a>

```typescript
public getBooleanMapAttribute(terraformAttribute: string): {[ key: string ]: boolean}
```

###### `terraformAttribute`<sup>Required</sup> <a name="terraformAttribute" id="cdktf-local-exec.LocalExec.getBooleanMapAttribute.parameter.terraformAttribute"></a>

- *Type:* string

---

##### `getListAttribute` <a name="getListAttribute" id="cdktf-local-exec.LocalExec.getListAttribute"></a>

```typescript
public getListAttribute(terraformAttribute: string): string[]
```

###### `terraformAttribute`<sup>Required</sup> <a name="terraformAttribute" id="cdktf-local-exec.LocalExec.getListAttribute.parameter.terraformAttribute"></a>

- *Type:* string

---

##### `getNumberAttribute` <a name="getNumberAttribute" id="cdktf-local-exec.LocalExec.getNumberAttribute"></a>

```typescript
public getNumberAttribute(terraformAttribute: string): number
```

###### `terraformAttribute`<sup>Required</sup> <a name="terraformAttribute" id="cdktf-local-exec.LocalExec.getNumberAttribute.parameter.terraformAttribute"></a>

- *Type:* string

---

##### `getNumberListAttribute` <a name="getNumberListAttribute" id="cdktf-local-exec.LocalExec.getNumberListAttribute"></a>

```typescript
public getNumberListAttribute(terraformAttribute: string): number[]
```

###### `terraformAttribute`<sup>Required</sup> <a name="terraformAttribute" id="cdktf-local-exec.LocalExec.getNumberListAttribute.parameter.terraformAttribute"></a>

- *Type:* string

---

##### `getNumberMapAttribute` <a name="getNumberMapAttribute" id="cdktf-local-exec.LocalExec.getNumberMapAttribute"></a>

```typescript
public getNumberMapAttribute(terraformAttribute: string): {[ key: string ]: number}
```

###### `terraformAttribute`<sup>Required</sup> <a name="terraformAttribute" id="cdktf-local-exec.LocalExec.getNumberMapAttribute.parameter.terraformAttribute"></a>

- *Type:* string

---

##### `getStringAttribute` <a name="getStringAttribute" id="cdktf-local-exec.LocalExec.getStringAttribute"></a>

```typescript
public getStringAttribute(terraformAttribute: string): string
```

###### `terraformAttribute`<sup>Required</sup> <a name="terraformAttribute" id="cdktf-local-exec.LocalExec.getStringAttribute.parameter.terraformAttribute"></a>

- *Type:* string

---

##### `getStringMapAttribute` <a name="getStringMapAttribute" id="cdktf-local-exec.LocalExec.getStringMapAttribute"></a>

```typescript
public getStringMapAttribute(terraformAttribute: string): {[ key: string ]: string}
```

###### `terraformAttribute`<sup>Required</sup> <a name="terraformAttribute" id="cdktf-local-exec.LocalExec.getStringMapAttribute.parameter.terraformAttribute"></a>

- *Type:* string

---

##### `importFrom` <a name="importFrom" id="cdktf-local-exec.LocalExec.importFrom"></a>

```typescript
public importFrom(id: string, provider?: TerraformProvider): void
```

###### `id`<sup>Required</sup> <a name="id" id="cdktf-local-exec.LocalExec.importFrom.parameter.id"></a>

- *Type:* string

---

###### `provider`<sup>Optional</sup> <a name="provider" id="cdktf-local-exec.LocalExec.importFrom.parameter.provider"></a>

- *Type:* cdktf.TerraformProvider

---

##### `interpolationForAttribute` <a name="interpolationForAttribute" id="cdktf-local-exec.LocalExec.interpolationForAttribute"></a>

```typescript
public interpolationForAttribute(terraformAttribute: string): IResolvable
```

###### `terraformAttribute`<sup>Required</sup> <a name="terraformAttribute" id="cdktf-local-exec.LocalExec.interpolationForAttribute.parameter.terraformAttribute"></a>

- *Type:* string

---

##### `moveTo` <a name="moveTo" id="cdktf-local-exec.LocalExec.moveTo"></a>

```typescript
public moveTo(moveTarget: string, index?: string | number): void
```

Moves this resource to the target resource given by moveTarget.

###### `moveTarget`<sup>Required</sup> <a name="moveTarget" id="cdktf-local-exec.LocalExec.moveTo.parameter.moveTarget"></a>

- *Type:* string

The previously set user defined string set by .addMoveTarget() corresponding to the resource to move to.

---

###### `index`<sup>Optional</sup> <a name="index" id="cdktf-local-exec.LocalExec.moveTo.parameter.index"></a>

- *Type:* string | number

Optional The index corresponding to the key the resource is to appear in the foreach of a resource to move to.

---

##### `resetTriggers` <a name="resetTriggers" id="cdktf-local-exec.LocalExec.resetTriggers"></a>

```typescript
public resetTriggers(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdktf-local-exec.LocalExec.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#cdktf-local-exec.LocalExec.isTerraformElement">isTerraformElement</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.isTerraformResource">isTerraformResource</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.generateConfigForImport">generateConfigForImport</a></code> | Generates CDKTF code for importing a Resource resource upon running "cdktf plan <stack-name>". |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdktf-local-exec.LocalExec.isConstruct"></a>

```typescript
import { LocalExec } from 'cdktf-local-exec'

LocalExec.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdktf-local-exec.LocalExec.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isTerraformElement` <a name="isTerraformElement" id="cdktf-local-exec.LocalExec.isTerraformElement"></a>

```typescript
import { LocalExec } from 'cdktf-local-exec'

LocalExec.isTerraformElement(x: any)
```

###### `x`<sup>Required</sup> <a name="x" id="cdktf-local-exec.LocalExec.isTerraformElement.parameter.x"></a>

- *Type:* any

---

##### `isTerraformResource` <a name="isTerraformResource" id="cdktf-local-exec.LocalExec.isTerraformResource"></a>

```typescript
import { LocalExec } from 'cdktf-local-exec'

LocalExec.isTerraformResource(x: any)
```

###### `x`<sup>Required</sup> <a name="x" id="cdktf-local-exec.LocalExec.isTerraformResource.parameter.x"></a>

- *Type:* any

---

##### `generateConfigForImport` <a name="generateConfigForImport" id="cdktf-local-exec.LocalExec.generateConfigForImport"></a>

```typescript
import { LocalExec } from 'cdktf-local-exec'

LocalExec.generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: TerraformProvider)
```

Generates CDKTF code for importing a Resource resource upon running "cdktf plan <stack-name>".

###### `scope`<sup>Required</sup> <a name="scope" id="cdktf-local-exec.LocalExec.generateConfigForImport.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

###### `importToId`<sup>Required</sup> <a name="importToId" id="cdktf-local-exec.LocalExec.generateConfigForImport.parameter.importToId"></a>

- *Type:* string

The construct id used in the generated config for the Resource to import.

---

###### `importFromId`<sup>Required</sup> <a name="importFromId" id="cdktf-local-exec.LocalExec.generateConfigForImport.parameter.importFromId"></a>

- *Type:* string

The id of the existing Resource that should be imported.

Refer to the {@link https://registry.terraform.io/providers/hashicorp/null/3.2.1/docs/resources/resource#import import section} in the documentation of this resource for the id to use

---

###### `provider`<sup>Optional</sup> <a name="provider" id="cdktf-local-exec.LocalExec.generateConfigForImport.parameter.provider"></a>

- *Type:* cdktf.TerraformProvider

? Optional instance of the provider where the Resource to import is found.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdktf-local-exec.LocalExec.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdktf-local-exec.LocalExec.property.cdktfStack">cdktfStack</a></code> | <code>cdktf.TerraformStack</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.fqn">fqn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.friendlyUniqueId">friendlyUniqueId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.terraformMetaArguments">terraformMetaArguments</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.terraformResourceType">terraformResourceType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.terraformGeneratorMetadata">terraformGeneratorMetadata</a></code> | <code>cdktf.TerraformProviderGeneratorMetadata</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.connection">connection</a></code> | <code>cdktf.SSHProvisionerConnection \| cdktf.WinrmProvisionerConnection</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.count">count</a></code> | <code>number \| cdktf.TerraformCount</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.dependsOn">dependsOn</a></code> | <code>string[]</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.forEach">forEach</a></code> | <code>cdktf.ITerraformIterator</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.lifecycle">lifecycle</a></code> | <code>cdktf.TerraformResourceLifecycle</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.provider">provider</a></code> | <code>cdktf.TerraformProvider</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.provisioners">provisioners</a></code> | <code>cdktf.FileProvisioner \| cdktf.LocalExecProvisioner \| cdktf.RemoteExecProvisioner[]</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.triggersInput">triggersInput</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.triggers">triggers</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.command">command</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExec.property.cwd">cwd</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdktf-local-exec.LocalExec.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cdktfStack`<sup>Required</sup> <a name="cdktfStack" id="cdktf-local-exec.LocalExec.property.cdktfStack"></a>

```typescript
public readonly cdktfStack: TerraformStack;
```

- *Type:* cdktf.TerraformStack

---

##### `fqn`<sup>Required</sup> <a name="fqn" id="cdktf-local-exec.LocalExec.property.fqn"></a>

```typescript
public readonly fqn: string;
```

- *Type:* string

---

##### `friendlyUniqueId`<sup>Required</sup> <a name="friendlyUniqueId" id="cdktf-local-exec.LocalExec.property.friendlyUniqueId"></a>

```typescript
public readonly friendlyUniqueId: string;
```

- *Type:* string

---

##### `terraformMetaArguments`<sup>Required</sup> <a name="terraformMetaArguments" id="cdktf-local-exec.LocalExec.property.terraformMetaArguments"></a>

```typescript
public readonly terraformMetaArguments: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `terraformResourceType`<sup>Required</sup> <a name="terraformResourceType" id="cdktf-local-exec.LocalExec.property.terraformResourceType"></a>

```typescript
public readonly terraformResourceType: string;
```

- *Type:* string

---

##### `terraformGeneratorMetadata`<sup>Optional</sup> <a name="terraformGeneratorMetadata" id="cdktf-local-exec.LocalExec.property.terraformGeneratorMetadata"></a>

```typescript
public readonly terraformGeneratorMetadata: TerraformProviderGeneratorMetadata;
```

- *Type:* cdktf.TerraformProviderGeneratorMetadata

---

##### `connection`<sup>Optional</sup> <a name="connection" id="cdktf-local-exec.LocalExec.property.connection"></a>

```typescript
public readonly connection: SSHProvisionerConnection | WinrmProvisionerConnection;
```

- *Type:* cdktf.SSHProvisionerConnection | cdktf.WinrmProvisionerConnection

---

##### `count`<sup>Optional</sup> <a name="count" id="cdktf-local-exec.LocalExec.property.count"></a>

```typescript
public readonly count: number | TerraformCount;
```

- *Type:* number | cdktf.TerraformCount

---

##### `dependsOn`<sup>Optional</sup> <a name="dependsOn" id="cdktf-local-exec.LocalExec.property.dependsOn"></a>

```typescript
public readonly dependsOn: string[];
```

- *Type:* string[]

---

##### `forEach`<sup>Optional</sup> <a name="forEach" id="cdktf-local-exec.LocalExec.property.forEach"></a>

```typescript
public readonly forEach: ITerraformIterator;
```

- *Type:* cdktf.ITerraformIterator

---

##### `lifecycle`<sup>Optional</sup> <a name="lifecycle" id="cdktf-local-exec.LocalExec.property.lifecycle"></a>

```typescript
public readonly lifecycle: TerraformResourceLifecycle;
```

- *Type:* cdktf.TerraformResourceLifecycle

---

##### `provider`<sup>Optional</sup> <a name="provider" id="cdktf-local-exec.LocalExec.property.provider"></a>

```typescript
public readonly provider: TerraformProvider;
```

- *Type:* cdktf.TerraformProvider

---

##### `provisioners`<sup>Optional</sup> <a name="provisioners" id="cdktf-local-exec.LocalExec.property.provisioners"></a>

```typescript
public readonly provisioners: FileProvisioner | LocalExecProvisioner | RemoteExecProvisioner[];
```

- *Type:* cdktf.FileProvisioner | cdktf.LocalExecProvisioner | cdktf.RemoteExecProvisioner[]

---

##### `id`<sup>Required</sup> <a name="id" id="cdktf-local-exec.LocalExec.property.id"></a>

```typescript
public readonly id: string;
```

- *Type:* string

---

##### `triggersInput`<sup>Optional</sup> <a name="triggersInput" id="cdktf-local-exec.LocalExec.property.triggersInput"></a>

```typescript
public readonly triggersInput: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `triggers`<sup>Required</sup> <a name="triggers" id="cdktf-local-exec.LocalExec.property.triggers"></a>

```typescript
public readonly triggers: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---

##### `command`<sup>Required</sup> <a name="command" id="cdktf-local-exec.LocalExec.property.command"></a>

```typescript
public readonly command: string;
```

- *Type:* string

---

##### `cwd`<sup>Required</sup> <a name="cwd" id="cdktf-local-exec.LocalExec.property.cwd"></a>

```typescript
public readonly cwd: string;
```

- *Type:* string

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdktf-local-exec.LocalExec.property.tfResourceType">tfResourceType</a></code> | <code>string</code> | *No description.* |

---

##### `tfResourceType`<sup>Required</sup> <a name="tfResourceType" id="cdktf-local-exec.LocalExec.property.tfResourceType"></a>

```typescript
public readonly tfResourceType: string;
```

- *Type:* string

---

### NullProvider <a name="NullProvider" id="cdktf-local-exec.NullProvider"></a>

Represents a {@link https://registry.terraform.io/providers/hashicorp/null/3.2.1/docs null}.

#### Initializers <a name="Initializers" id="cdktf-local-exec.NullProvider.Initializer"></a>

```typescript
import { NullProvider } from 'cdktf-local-exec'

new NullProvider(scope: Construct, id: string, config?: NullProviderConfig)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdktf-local-exec.NullProvider.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | The scope in which to define this construct. |
| <code><a href="#cdktf-local-exec.NullProvider.Initializer.parameter.id">id</a></code> | <code>string</code> | The scoped construct ID. |
| <code><a href="#cdktf-local-exec.NullProvider.Initializer.parameter.config">config</a></code> | <code>@cdktf/provider-null.provider.NullProviderConfig</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdktf-local-exec.NullProvider.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="id" id="cdktf-local-exec.NullProvider.Initializer.parameter.id"></a>

- *Type:* string

The scoped construct ID.

Must be unique amongst siblings in the same scope

---

##### `config`<sup>Optional</sup> <a name="config" id="cdktf-local-exec.NullProvider.Initializer.parameter.config"></a>

- *Type:* @cdktf/provider-null.provider.NullProviderConfig

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdktf-local-exec.NullProvider.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdktf-local-exec.NullProvider.addOverride">addOverride</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.overrideLogicalId">overrideLogicalId</a></code> | Overrides the auto-generated logical ID with a specific ID. |
| <code><a href="#cdktf-local-exec.NullProvider.resetOverrideLogicalId">resetOverrideLogicalId</a></code> | Resets a previously passed logical Id to use the auto-generated logical id again. |
| <code><a href="#cdktf-local-exec.NullProvider.toMetadata">toMetadata</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.toTerraform">toTerraform</a></code> | Adds this resource to the terraform JSON output. |
| <code><a href="#cdktf-local-exec.NullProvider.resetAlias">resetAlias</a></code> | *No description.* |

---

##### `toString` <a name="toString" id="cdktf-local-exec.NullProvider.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `addOverride` <a name="addOverride" id="cdktf-local-exec.NullProvider.addOverride"></a>

```typescript
public addOverride(path: string, value: any): void
```

###### `path`<sup>Required</sup> <a name="path" id="cdktf-local-exec.NullProvider.addOverride.parameter.path"></a>

- *Type:* string

---

###### `value`<sup>Required</sup> <a name="value" id="cdktf-local-exec.NullProvider.addOverride.parameter.value"></a>

- *Type:* any

---

##### `overrideLogicalId` <a name="overrideLogicalId" id="cdktf-local-exec.NullProvider.overrideLogicalId"></a>

```typescript
public overrideLogicalId(newLogicalId: string): void
```

Overrides the auto-generated logical ID with a specific ID.

###### `newLogicalId`<sup>Required</sup> <a name="newLogicalId" id="cdktf-local-exec.NullProvider.overrideLogicalId.parameter.newLogicalId"></a>

- *Type:* string

The new logical ID to use for this stack element.

---

##### `resetOverrideLogicalId` <a name="resetOverrideLogicalId" id="cdktf-local-exec.NullProvider.resetOverrideLogicalId"></a>

```typescript
public resetOverrideLogicalId(): void
```

Resets a previously passed logical Id to use the auto-generated logical id again.

##### `toMetadata` <a name="toMetadata" id="cdktf-local-exec.NullProvider.toMetadata"></a>

```typescript
public toMetadata(): any
```

##### `toTerraform` <a name="toTerraform" id="cdktf-local-exec.NullProvider.toTerraform"></a>

```typescript
public toTerraform(): any
```

Adds this resource to the terraform JSON output.

##### `resetAlias` <a name="resetAlias" id="cdktf-local-exec.NullProvider.resetAlias"></a>

```typescript
public resetAlias(): void
```

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdktf-local-exec.NullProvider.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#cdktf-local-exec.NullProvider.isTerraformElement">isTerraformElement</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.isTerraformProvider">isTerraformProvider</a></code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.generateConfigForImport">generateConfigForImport</a></code> | Generates CDKTF code for importing a NullProvider resource upon running "cdktf plan <stack-name>". |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdktf-local-exec.NullProvider.isConstruct"></a>

```typescript
import { NullProvider } from 'cdktf-local-exec'

NullProvider.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdktf-local-exec.NullProvider.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isTerraformElement` <a name="isTerraformElement" id="cdktf-local-exec.NullProvider.isTerraformElement"></a>

```typescript
import { NullProvider } from 'cdktf-local-exec'

NullProvider.isTerraformElement(x: any)
```

###### `x`<sup>Required</sup> <a name="x" id="cdktf-local-exec.NullProvider.isTerraformElement.parameter.x"></a>

- *Type:* any

---

##### `isTerraformProvider` <a name="isTerraformProvider" id="cdktf-local-exec.NullProvider.isTerraformProvider"></a>

```typescript
import { NullProvider } from 'cdktf-local-exec'

NullProvider.isTerraformProvider(x: any)
```

###### `x`<sup>Required</sup> <a name="x" id="cdktf-local-exec.NullProvider.isTerraformProvider.parameter.x"></a>

- *Type:* any

---

##### `generateConfigForImport` <a name="generateConfigForImport" id="cdktf-local-exec.NullProvider.generateConfigForImport"></a>

```typescript
import { NullProvider } from 'cdktf-local-exec'

NullProvider.generateConfigForImport(scope: Construct, importToId: string, importFromId: string, provider?: TerraformProvider)
```

Generates CDKTF code for importing a NullProvider resource upon running "cdktf plan <stack-name>".

###### `scope`<sup>Required</sup> <a name="scope" id="cdktf-local-exec.NullProvider.generateConfigForImport.parameter.scope"></a>

- *Type:* constructs.Construct

The scope in which to define this construct.

---

###### `importToId`<sup>Required</sup> <a name="importToId" id="cdktf-local-exec.NullProvider.generateConfigForImport.parameter.importToId"></a>

- *Type:* string

The construct id used in the generated config for the NullProvider to import.

---

###### `importFromId`<sup>Required</sup> <a name="importFromId" id="cdktf-local-exec.NullProvider.generateConfigForImport.parameter.importFromId"></a>

- *Type:* string

The id of the existing NullProvider that should be imported.

Refer to the {@link https://registry.terraform.io/providers/hashicorp/null/3.2.1/docs#import import section} in the documentation of this resource for the id to use

---

###### `provider`<sup>Optional</sup> <a name="provider" id="cdktf-local-exec.NullProvider.generateConfigForImport.parameter.provider"></a>

- *Type:* cdktf.TerraformProvider

? Optional instance of the provider where the NullProvider to import is found.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdktf-local-exec.NullProvider.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdktf-local-exec.NullProvider.property.cdktfStack">cdktfStack</a></code> | <code>cdktf.TerraformStack</code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.property.fqn">fqn</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.property.friendlyUniqueId">friendlyUniqueId</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.property.metaAttributes">metaAttributes</a></code> | <code>{[ key: string ]: any}</code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.property.terraformResourceType">terraformResourceType</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.property.terraformGeneratorMetadata">terraformGeneratorMetadata</a></code> | <code>cdktf.TerraformProviderGeneratorMetadata</code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.property.terraformProviderSource">terraformProviderSource</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.property.alias">alias</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdktf-local-exec.NullProvider.property.aliasInput">aliasInput</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdktf-local-exec.NullProvider.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cdktfStack`<sup>Required</sup> <a name="cdktfStack" id="cdktf-local-exec.NullProvider.property.cdktfStack"></a>

```typescript
public readonly cdktfStack: TerraformStack;
```

- *Type:* cdktf.TerraformStack

---

##### `fqn`<sup>Required</sup> <a name="fqn" id="cdktf-local-exec.NullProvider.property.fqn"></a>

```typescript
public readonly fqn: string;
```

- *Type:* string

---

##### `friendlyUniqueId`<sup>Required</sup> <a name="friendlyUniqueId" id="cdktf-local-exec.NullProvider.property.friendlyUniqueId"></a>

```typescript
public readonly friendlyUniqueId: string;
```

- *Type:* string

---

##### `metaAttributes`<sup>Required</sup> <a name="metaAttributes" id="cdktf-local-exec.NullProvider.property.metaAttributes"></a>

```typescript
public readonly metaAttributes: {[ key: string ]: any};
```

- *Type:* {[ key: string ]: any}

---

##### `terraformResourceType`<sup>Required</sup> <a name="terraformResourceType" id="cdktf-local-exec.NullProvider.property.terraformResourceType"></a>

```typescript
public readonly terraformResourceType: string;
```

- *Type:* string

---

##### `terraformGeneratorMetadata`<sup>Optional</sup> <a name="terraformGeneratorMetadata" id="cdktf-local-exec.NullProvider.property.terraformGeneratorMetadata"></a>

```typescript
public readonly terraformGeneratorMetadata: TerraformProviderGeneratorMetadata;
```

- *Type:* cdktf.TerraformProviderGeneratorMetadata

---

##### `terraformProviderSource`<sup>Optional</sup> <a name="terraformProviderSource" id="cdktf-local-exec.NullProvider.property.terraformProviderSource"></a>

```typescript
public readonly terraformProviderSource: string;
```

- *Type:* string

---

##### `alias`<sup>Optional</sup> <a name="alias" id="cdktf-local-exec.NullProvider.property.alias"></a>

```typescript
public readonly alias: string;
```

- *Type:* string

---

##### `aliasInput`<sup>Optional</sup> <a name="aliasInput" id="cdktf-local-exec.NullProvider.property.aliasInput"></a>

```typescript
public readonly aliasInput: string;
```

- *Type:* string

---

#### Constants <a name="Constants" id="Constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdktf-local-exec.NullProvider.property.tfResourceType">tfResourceType</a></code> | <code>string</code> | *No description.* |

---

##### `tfResourceType`<sup>Required</sup> <a name="tfResourceType" id="cdktf-local-exec.NullProvider.property.tfResourceType"></a>

```typescript
public readonly tfResourceType: string;
```

- *Type:* string

---

## Structs <a name="Structs" id="Structs"></a>

### LocalExecConfig <a name="LocalExecConfig" id="cdktf-local-exec.LocalExecConfig"></a>

#### Initializer <a name="Initializer" id="cdktf-local-exec.LocalExecConfig.Initializer"></a>

```typescript
import { LocalExecConfig } from 'cdktf-local-exec'

const localExecConfig: LocalExecConfig = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdktf-local-exec.LocalExecConfig.property.command">command</a></code> | <code>string</code> | The command to run. |
| <code><a href="#cdktf-local-exec.LocalExecConfig.property.cwd">cwd</a></code> | <code>string</code> | The working directory to run the command in. |
| <code><a href="#cdktf-local-exec.LocalExecConfig.property.copyBeforeRun">copyBeforeRun</a></code> | <code>boolean</code> | If set to true, the working directory will be copied to an asset directory. |
| <code><a href="#cdktf-local-exec.LocalExecConfig.property.dependsOn">dependsOn</a></code> | <code>cdktf.ITerraformDependable[]</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExecConfig.property.lifecycle">lifecycle</a></code> | <code>cdktf.TerraformResourceLifecycle</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExecConfig.property.provider">provider</a></code> | <code>cdktf.TerraformProvider</code> | *No description.* |
| <code><a href="#cdktf-local-exec.LocalExecConfig.property.triggers">triggers</a></code> | <code>{[ key: string ]: string}</code> | *No description.* |

---

##### `command`<sup>Required</sup> <a name="command" id="cdktf-local-exec.LocalExecConfig.property.command"></a>

```typescript
public readonly command: string;
```

- *Type:* string

The command to run.

---

##### `cwd`<sup>Required</sup> <a name="cwd" id="cdktf-local-exec.LocalExecConfig.property.cwd"></a>

```typescript
public readonly cwd: string;
```

- *Type:* string

The working directory to run the command in.

Defaults to process.pwd().
If copyBeforeRun is set to true it will copy the working directory to an asset directory and take that as the base to run.

---

##### `copyBeforeRun`<sup>Optional</sup> <a name="copyBeforeRun" id="cdktf-local-exec.LocalExecConfig.property.copyBeforeRun"></a>

```typescript
public readonly copyBeforeRun: boolean;
```

- *Type:* boolean
- *Default:* true

If set to true, the working directory will be copied to an asset directory.

---

##### `dependsOn`<sup>Optional</sup> <a name="dependsOn" id="cdktf-local-exec.LocalExecConfig.property.dependsOn"></a>

```typescript
public readonly dependsOn: ITerraformDependable[];
```

- *Type:* cdktf.ITerraformDependable[]

---

##### `lifecycle`<sup>Optional</sup> <a name="lifecycle" id="cdktf-local-exec.LocalExecConfig.property.lifecycle"></a>

```typescript
public readonly lifecycle: TerraformResourceLifecycle;
```

- *Type:* cdktf.TerraformResourceLifecycle

---

##### `provider`<sup>Optional</sup> <a name="provider" id="cdktf-local-exec.LocalExecConfig.property.provider"></a>

```typescript
public readonly provider: TerraformProvider;
```

- *Type:* cdktf.TerraformProvider

---

##### `triggers`<sup>Optional</sup> <a name="triggers" id="cdktf-local-exec.LocalExecConfig.property.triggers"></a>

```typescript
public readonly triggers: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: string}

---



