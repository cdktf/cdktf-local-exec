# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="constructs"></a>

### LocalExec <a name="cdktf-local-exec.LocalExec" id="cdktflocalexeclocalexec"></a>

#### Initializers <a name="cdktf-local-exec.LocalExec.Initializer" id="cdktflocalexeclocalexecinitializer"></a>

```typescript
import { LocalExec } from 'cdktf-local-exec'

new LocalExec(scope: Construct, id: string, config: LocalExecOptions)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdktflocalexeclocalexecparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | *No description.* |
| [`id`](#cdktflocalexeclocalexecparameterid)<span title="Required">*</span> | `string` | *No description.* |
| [`config`](#cdktflocalexeclocalexecparameterconfig)<span title="Required">*</span> | [`cdktf-local-exec.LocalExecOptions`](#cdktf-local-exec.LocalExecOptions) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdktf-local-exec.LocalExec.parameter.scope" id="cdktflocalexeclocalexecparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

---

##### `id`<sup>Required</sup> <a name="cdktf-local-exec.LocalExec.parameter.id" id="cdktflocalexeclocalexecparameterid"></a>

- *Type:* `string`

---

##### `config`<sup>Required</sup> <a name="cdktf-local-exec.LocalExec.parameter.config" id="cdktflocalexeclocalexecparameterconfig"></a>

- *Type:* [`cdktf-local-exec.LocalExecOptions`](#cdktf-local-exec.LocalExecOptions)

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

Represents a {@link https://www.terraform.io/docs/providers/null null}.

#### Initializers <a name="cdktf-local-exec.NullProvider.Initializer" id="cdktflocalexecnullproviderinitializer"></a>

```typescript
import { NullProvider } from 'cdktf-local-exec'

new NullProvider(scope: Construct, id: string, config?: NullProviderConfig)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`scope`](#cdktflocalexecnullproviderparameterscope)<span title="Required">*</span> | [`constructs.Construct`](#constructs.Construct) | The scope in which to define this construct. |
| [`id`](#cdktflocalexecnullproviderparameterid)<span title="Required">*</span> | `string` | The scoped construct ID. |
| [`config`](#cdktflocalexecnullproviderparameterconfig) | [`@cdktf/provider-null.NullProviderConfig`](#@cdktf/provider-null.NullProviderConfig) | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="cdktf-local-exec.NullProvider.parameter.scope" id="cdktflocalexecnullproviderparameterscope"></a>

- *Type:* [`constructs.Construct`](#constructs.Construct)

The scope in which to define this construct.

---

##### `id`<sup>Required</sup> <a name="cdktf-local-exec.NullProvider.parameter.id" id="cdktflocalexecnullproviderparameterid"></a>

- *Type:* `string`

The scoped construct ID.

---

##### `config`<sup>Optional</sup> <a name="cdktf-local-exec.NullProvider.parameter.config" id="cdktflocalexecnullproviderparameterconfig"></a>

- *Type:* [`@cdktf/provider-null.NullProviderConfig`](#@cdktf/provider-null.NullProviderConfig)

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
| [`tfResourceType`](#cdktflocalexecnullproviderpropertytfresourcetype)<span title="Required">*</span> | `string` | *No description.* |
| [`aliasInput`](#cdktflocalexecnullproviderpropertyaliasinput) | `string` | *No description.* |
| [`alias`](#cdktflocalexecnullproviderpropertyalias) | `string` | *No description.* |

---

##### `tfResourceType`<sup>Required</sup> <a name="cdktf-local-exec.NullProvider.property.tfResourceType" id="cdktflocalexecnullproviderpropertytfresourcetype"></a>

```typescript
public readonly tfResourceType: string;
```

- *Type:* `string`

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


## Structs <a name="Structs" id="structs"></a>

### LocalExecOptions <a name="cdktf-local-exec.LocalExecOptions" id="cdktflocalexeclocalexecoptions"></a>

#### Initializer <a name="[object Object].Initializer" id="object-objectinitializer"></a>

```typescript
import { LocalExecOptions } from 'cdktf-local-exec'

const localExecOptions: LocalExecOptions = { ... }
```

#### Properties <a name="Properties" id="properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| [`command`](#cdktflocalexeclocalexecoptionspropertycommand)<span title="Required">*</span> | `string` | The command to run. |
| [`cwd`](#cdktflocalexeclocalexecoptionspropertycwd)<span title="Required">*</span> | `string` | The working directory to run the command in. |
| [`copyBeforeRun`](#cdktflocalexeclocalexecoptionspropertycopybeforerun) | `boolean` | If set to true, the working directory will be copied to an asset directory. |
| [`dependsOn`](#cdktflocalexeclocalexecoptionspropertydependson) | [`cdktf.ITerraformDependable`](#cdktf.ITerraformDependable)[] | *No description.* |
| [`lifecycle`](#cdktflocalexeclocalexecoptionspropertylifecycle) | [`cdktf.TerraformResourceLifecycle`](#cdktf.TerraformResourceLifecycle) | *No description.* |
| [`provider`](#cdktflocalexeclocalexecoptionspropertyprovider) | [`cdktf.TerraformProvider`](#cdktf.TerraformProvider) | *No description.* |
| [`triggers`](#cdktflocalexeclocalexecoptionspropertytriggers) | {[ key: string ]: `string`} \| [`cdktf.IResolvable`](#cdktf.IResolvable) | *No description.* |

---

##### `command`<sup>Required</sup> <a name="cdktf-local-exec.LocalExecOptions.property.command" id="cdktflocalexeclocalexecoptionspropertycommand"></a>

```typescript
public readonly command: string;
```

- *Type:* `string`

The command to run.

---

##### `cwd`<sup>Required</sup> <a name="cdktf-local-exec.LocalExecOptions.property.cwd" id="cdktflocalexeclocalexecoptionspropertycwd"></a>

```typescript
public readonly cwd: string;
```

- *Type:* `string`

The working directory to run the command in.

Defaults to process.pwd(). If copyBeforeRun is set to true it will copy the working directory to an asset directory and take that as the base to run.

---

##### `copyBeforeRun`<sup>Optional</sup> <a name="cdktf-local-exec.LocalExecOptions.property.copyBeforeRun" id="cdktflocalexeclocalexecoptionspropertycopybeforerun"></a>

```typescript
public readonly copyBeforeRun: boolean;
```

- *Type:* `boolean`
- *Default:* true

If set to true, the working directory will be copied to an asset directory.

---

##### `dependsOn`<sup>Optional</sup> <a name="cdktf-local-exec.LocalExecOptions.property.dependsOn" id="cdktflocalexeclocalexecoptionspropertydependson"></a>

```typescript
public readonly dependsOn: ITerraformDependable[];
```

- *Type:* [`cdktf.ITerraformDependable`](#cdktf.ITerraformDependable)[]

---

##### `lifecycle`<sup>Optional</sup> <a name="cdktf-local-exec.LocalExecOptions.property.lifecycle" id="cdktflocalexeclocalexecoptionspropertylifecycle"></a>

```typescript
public readonly lifecycle: TerraformResourceLifecycle;
```

- *Type:* [`cdktf.TerraformResourceLifecycle`](#cdktf.TerraformResourceLifecycle)

---

##### `provider`<sup>Optional</sup> <a name="cdktf-local-exec.LocalExecOptions.property.provider" id="cdktflocalexeclocalexecoptionspropertyprovider"></a>

```typescript
public readonly provider: TerraformProvider;
```

- *Type:* [`cdktf.TerraformProvider`](#cdktf.TerraformProvider)

---

##### `triggers`<sup>Optional</sup> <a name="cdktf-local-exec.LocalExecOptions.property.triggers" id="cdktflocalexeclocalexecoptionspropertytriggers"></a>

```typescript
public readonly triggers: {[ key: string ]: string} | IResolvable;
```

- *Type:* {[ key: string ]: `string`} | [`cdktf.IResolvable`](#cdktf.IResolvable)

---



