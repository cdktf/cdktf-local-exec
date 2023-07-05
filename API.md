# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### LocalExec <a name="cdktf-local-exec.LocalExec" id="cdktflocalexeclocalexec"></a>

#### Initializers <a name="cdktf-local-exec.LocalExec.Initializer" id="cdktflocalexeclocalexecinitializer"></a>

```typescript
import { LocalExec } from 'cdktf-local-exec'

new LocalExec(scope: Construct, id: string, config: LocalExecConfig)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdktflocalexeclocalexecparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cdktflocalexeclocalexecparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`config`](#cdktflocalexeclocalexecparameterconfig)<span title="Required">*</span> | [`cdktf-local-exec.LocalExecConfig`](#cdktf-local-exec.LocalExecConfig) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdktf-local-exec.LocalExec.parameter.scope" id="cdktflocalexeclocalexecparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdktf-local-exec.LocalExec.parameter.id" id="cdktflocalexeclocalexecparameterid"></a>

- *Type:* `string`

---

##### `config`<sup>Required</sup> <a name="cdktf-local-exec.LocalExec.parameter.config" id="cdktflocalexeclocalexecparameterconfig"></a>

- *Type:* [`cdktf-local-exec.LocalExecConfig`](#cdktf-local-exec.LocalExecConfig)

---



#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`command`](#cdktflocalexeclocalexecpropertycommand)<span title="Required">*</span> | `string` | *No description.* |
| [`cwd`](#cdktflocalexeclocalexecpropertycwd)<span title="Required">*</span> | `string` | *No description.* |

---

##### `command`<sup>Required</sup> <a name="cdktf-local-exec.LocalExec.property.command" id="cdktflocalexeclocalexecpropertycommand"></a>

```typescript
public readonly command: string;
```

- *Type:* `string`

---

##### `cwd`<sup>Required</sup> <a name="cdktf-local-exec.LocalExec.property.cwd" id="cdktflocalexeclocalexecpropertycwd"></a>

```typescript
public readonly cwd: string;
```

- *Type:* `string`

---


### NullProvider <a name="cdktf-local-exec.NullProvider" id="cdktflocalexecnullprovider"></a>

Represents a {@link https://registry.terraform.io/providers/hashicorp/null/3.2.1/docs null}.

#### Initializers <a name="cdktf-local-exec.NullProvider.Initializer" id="cdktflocalexecnullproviderinitializer"></a>

```typescript
import { NullProvider } from 'cdktf-local-exec'

new NullProvider(scope: Construct, id: string, config?: NullProviderConfig)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdktflocalexecnullproviderparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | The scope in which to define this construct. |
| [`id`](#cdktflocalexecnullproviderparameterid)<span title="Required">*</span> | `string` | The scoped construct ID. |
| [`config`](#cdktflocalexecnullproviderparameterconfig) | [`@cdktf/provider-null.provider.NullProviderConfig`](#@cdktf/provider-null.provider.NullProviderConfig) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdktf-local-exec.NullProvider.parameter.scope" id="cdktflocalexecnullproviderparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="cdktf-local-exec.NullProvider.parameter.id" id="cdktflocalexecnullproviderparameterid"></a>

- *Type:* `string`

The scoped construct ID.

Must be unique amongst siblings in the same scope

---

##### `config`<sup>Optional</sup> <a name="cdktf-local-exec.NullProvider.parameter.config" id="cdktflocalexecnullproviderparameterconfig"></a>

- *Type:* [`@cdktf/provider-null.provider.NullProviderConfig`](#@cdktf/provider-null.provider.NullProviderConfig)

---

#### Methods <a name="Methods" id="methods"></a>

| **Name** | **Description** |
| --- | --- |
| [`resetAlias`](#cdktflocalexecnullproviderresetalias) | *No description.* |

---

##### `resetAlias` <a name="cdktf-local-exec.NullProvider.resetAlias" id="cdktflocalexecnullproviderresetalias"></a>

```typescript
public resetAlias()
```


#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`aliasInput`](#cdktflocalexecnullproviderpropertyaliasinput) | `string` | *No description.* |
| [`alias`](#cdktflocalexecnullproviderpropertyalias) | `string` | *No description.* |

---

##### `aliasInput`<sup>Optional</sup> <a name="cdktf-local-exec.NullProvider.property.aliasInput" id="cdktflocalexecnullproviderpropertyaliasinput"></a>

```typescript
public readonly aliasInput: string;
```

- *Type:* `string`

---

##### `alias`<sup>Optional</sup> <a name="cdktf-local-exec.NullProvider.property.alias" id="cdktflocalexecnullproviderpropertyalias"></a>

```typescript
public readonly alias: string;
```

- *Type:* `string`

---

#### Constants <a name="Constants" id="constants"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`tfResourceType`](#cdktflocalexecnullproviderpropertytfresourcetype)<span title="Required">*</span> | `string` | *No description.* |

---

##### `tfResourceType` <a name="cdktf-local-exec.NullProvider.property.tfResourceType" id="cdktflocalexecnullproviderpropertytfresourcetype"></a>

- *Type:* `string`

---

## Structs <a name="Structs" id="structs"></a>

### LocalExecConfig <a name="cdktf-local-exec.LocalExecConfig" id="cdktflocalexeclocalexecconfig"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { LocalExecConfig } from 'cdktf-local-exec'

const localExecConfig: LocalExecConfig = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`command`](#cdktflocalexeclocalexecconfigpropertycommand)<span title="Required">*</span> | `string` | The command to run. |
| [`cwd`](#cdktflocalexeclocalexecconfigpropertycwd)<span title="Required">*</span> | `string` | The working directory to run the command in. |
| [`copyBeforeRun`](#cdktflocalexeclocalexecconfigpropertycopybeforerun) | `boolean` | If set to true, the working directory will be copied to an asset directory. |
| [`dependsOn`](#cdktflocalexeclocalexecconfigpropertydependson) | [`cdktf.ITerraformDependable`](#cdktf.ITerraformDependable)[] | *No description.* |
| [`lifecycle`](#cdktflocalexeclocalexecconfigpropertylifecycle) | [`cdktf.TerraformResourceLifecycle`](#cdktf.TerraformResourceLifecycle) | *No description.* |
| [`provider`](#cdktflocalexeclocalexecconfigpropertyprovider) | [`cdktf.TerraformProvider`](#cdktf.TerraformProvider) | *No description.* |
| [`triggers`](#cdktflocalexeclocalexecconfigpropertytriggers) | {[ key: string ]: `string`} | *No description.* |

---

##### `command`<sup>Required</sup> <a name="cdktf-local-exec.LocalExecConfig.property.command" id="cdktflocalexeclocalexecconfigpropertycommand"></a>

```typescript
public readonly command: string;
```

- *Type:* `string`

The command to run.

---

##### `cwd`<sup>Required</sup> <a name="cdktf-local-exec.LocalExecConfig.property.cwd" id="cdktflocalexeclocalexecconfigpropertycwd"></a>

```typescript
public readonly cwd: string;
```

- *Type:* `string`

The working directory to run the command in.

Defaults to process.pwd(). If copyBeforeRun is set to true it will copy the working directory to an asset directory and take that as the base to run.

---

##### `copyBeforeRun`<sup>Optional</sup> <a name="cdktf-local-exec.LocalExecConfig.property.copyBeforeRun" id="cdktflocalexeclocalexecconfigpropertycopybeforerun"></a>

```typescript
public readonly copyBeforeRun: boolean;
```

- *Type:* `boolean`
- *Default:* true

If set to true, the working directory will be copied to an asset directory.

---

##### `dependsOn`<sup>Optional</sup> <a name="cdktf-local-exec.LocalExecConfig.property.dependsOn" id="cdktflocalexeclocalexecconfigpropertydependson"></a>

```typescript
public readonly dependsOn: ITerraformDependable[];
```

- *Type:* [`cdktf.ITerraformDependable`](#cdktf.ITerraformDependable)[]

---

##### `lifecycle`<sup>Optional</sup> <a name="cdktf-local-exec.LocalExecConfig.property.lifecycle" id="cdktflocalexeclocalexecconfigpropertylifecycle"></a>

```typescript
public readonly lifecycle: TerraformResourceLifecycle;
```

- *Type:* [`cdktf.TerraformResourceLifecycle`](#cdktf.TerraformResourceLifecycle)

---

##### `provider`<sup>Optional</sup> <a name="cdktf-local-exec.LocalExecConfig.property.provider" id="cdktflocalexeclocalexecconfigpropertyprovider"></a>

```typescript
public readonly provider: TerraformProvider;
```

- *Type:* [`cdktf.TerraformProvider`](#cdktf.TerraformProvider)

---

##### `triggers`<sup>Optional</sup> <a name="cdktf-local-exec.LocalExecConfig.property.triggers" id="cdktflocalexeclocalexecconfigpropertytriggers"></a>

```typescript
public readonly triggers: {[ key: string ]: string};
```

- *Type:* {[ key: string ]: `string`}

---



